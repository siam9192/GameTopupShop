import { startSession, Types } from 'mongoose';
import { IAuthUser, IPaginationOptions } from '../../types';
import {
  MakeOrderLivePaymentPayload,
  MakeWalletAddBalanceLivePaymentPayload,
  MakeWalletPaymentPayload,
  MethodType,
  PaymentBy,
  TransactionsFilterPayload,
  TransactionStatus,
  TransactionType,
  UpdateTransactionStatusPayload,
} from './transaction.interface';
import AppError from '../../Errors/AppError';
import httpStatus from '../../shared/http-status';
import { objectId } from '../../helpers';
import TransactionModel from './transaction.model';
import { calculatePagination } from '../../helpers/paginationHelper';
import { UserRole } from '../user/user.interface';
import OrderModel from '../order/order.model';
import { OrderStatus, PaymentStatus } from '../order/order.interface';
import WalletModel from '../wallet/wallet.model';
import { GLOBAL_ERROR_MESSAGE } from '../../utils/constant';
import NotificationModel from '../notification/notification.model';
import { NotificationCategory, NotificationType } from '../notification/notification.interface';
import {
  convertToUSD,
  generateTransactionId,
  getCurrencyConversionRate,
} from '../../utils/helpers';
import { sslcommerzPayment } from '../../payment-method/sslCommez';
import envConfig from '../../config/env.config';
import { stripePayment } from '../../payment-method/stripePayment';
import CustomerModel from '../customer/customer.model';
import { WalletHistoryType } from '../wallet-history/wallet-history.interface';
import WalletHistoryModel from '../wallet-history/wallet-history.model';
import LivePaymentMethodModel from '../live-payment-method/live-payment-method.model';
import { LivePaymentMethodStatus } from '../live-payment-method/live-payment-method.interface';
import appSettingService from '../app-setting/app-setting.service';
import { AppSetting } from '../app-setting/app-setting.interface';

class TransactionService {
  async getTransactionsFromDB(
    filterPayload: TransactionsFilterPayload,
    paginationOptions: IPaginationOptions
  ) {
    const { id, customerId, orderId, minAmount, maxAmount, ...restPayload } = filterPayload;
    const whereConditions: Record<string, any> = {
      ...restPayload,
    };
    if (id) {
      if (!Types.ObjectId.isValid(id)) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Invalid id');
      }
      whereConditions._id = objectId(id);
    } else if (customerId) {
      whereConditions.customerId = objectId(customerId);
    } else if (orderId) {
      whereConditions.orderId = objectId(orderId);
    }

    if (
      (minAmount !== undefined && !isNaN(Number(minAmount))) ||
      (maxAmount !== undefined && !isNaN(Number(maxAmount)))
    ) {
      whereConditions.amount = {};

      if (minAmount !== undefined && !isNaN(Number(minAmount))) {
        whereConditions.amount.$gte = Number(minAmount);
      }

      if (maxAmount !== undefined && !isNaN(Number(maxAmount))) {
        whereConditions.amount.$lte = Number(maxAmount);
      }
    }

    const { page, skip, limit, sortBy, sortOrder } = calculatePagination(paginationOptions);

    const transactions = await TransactionModel.find(whereConditions)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .populate(['customerId', 'orderId'])
      .lean();
    const totalResults = await TransactionModel.countDocuments(whereConditions);

    const total = await TransactionModel.countDocuments();
    const data = transactions.map((transaction) => {
      const { customerId, orderId, ...rest } = transaction;
      return {
        ...rest,
        customerId: customerId._id,
        orderId: orderId,
        order: orderId,
        customer: customerId,
      };
    });
    const meta = {
      page,
      limit,
      totalResults,
      total,
    };

    return {
      data,
      meta,
    };
  }
  async getMyTransactionsFromDB(
    authUser: IAuthUser,
    filterPayload: TransactionsFilterPayload,
    paginationOptions: IPaginationOptions
  ) {
    const { id, orderId, ...restFilterPayload } = filterPayload;

    const whereConditions: Record<string, unknown> = {
      customerId: authUser.userId,
      ...restFilterPayload,
    };

    if (id) {
      if (!Types.ObjectId.isValid(id)) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Invalid id');
      }
      whereConditions._id = objectId(id);
    } else if (orderId) {
      whereConditions.orderId = objectId(orderId);
    }

    const { page, skip, limit, sortBy, sortOrder } = calculatePagination(paginationOptions);
    const transactions = await TransactionModel.find(whereConditions)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .populate(['orderId'])
      .lean();
    const totalResults = await TransactionModel.countDocuments(whereConditions);

    const total = await TransactionModel.countDocuments();

    const meta = {
      page,
      limit,
      totalResults,
      total,
    };

    return {
      data: transactions,
      meta,
    };
  }
  async getTransactionByIdFromDB(authUser: IAuthUser, id: string) {
    const existingTransaction = await TransactionModel.findById(id)
      .populate(['customerId', 'orderId'])
      .lean();

    if (!existingTransaction) {
      throw new AppError(httpStatus.NOT_FOUND, 'Transaction not found');
    }

    // Access control
    if (
      authUser.role === UserRole.CUSTOMER &&
      authUser.userId !== existingTransaction.customerId.toString()
    ) {
      throw new AppError(httpStatus.NOT_FOUND, 'Transaction not found');
    }

    // Format response
    const { customerId, orderId, ...rest } = existingTransaction;
    return {
      ...rest,
      customerId: customerId._id,
      order: orderId,
      customer: customerId,
    };
  }
  async updateTransactionStatusIntoDB(payload: UpdateTransactionStatusPayload) {
    const existingTransaction = await TransactionModel.findById(payload.id)
      .populate(['customerId', 'orderId'])
      .lean();

    if (!existingTransaction) {
      throw new AppError(httpStatus.NOT_FOUND, 'Transaction not found');
    }
    return await TransactionModel.findByIdAndUpdate(payload.id, { status: payload.status });
  }
  async makeOrderWalletPayment(authUser: IAuthUser, payload: MakeWalletPaymentPayload) {
    const { orderId } = payload;

    // 1️⃣ Fetch order and validate
    const order = await OrderModel.findOne({
      _id: objectId(orderId),
      customerId: objectId(authUser.userId),
      status: OrderStatus.PENDING,
    });
    if (!order) throw new AppError(httpStatus.NOT_FOUND, 'Order not found');

    // 2️⃣ Fetch wallet and validate balance
    const wallet = await WalletModel.findOne({ customerId: objectId(authUser.userId) });
    if (!wallet) throw new AppError(httpStatus.NOT_FOUND, 'Wallet not found');
    if (wallet.balance < order.payment.amount)
      throw new AppError(httpStatus.FORBIDDEN, 'Insufficient wallet balance');

    // 3️⃣ Load app currency
    const appSettings = (await appSettingService.getAppSettingFromDB()) as AppSetting;
    const appCurrency = appSettings.currency as string;

    const session = await startSession();
    session.startTransaction();
    const referenceId = generateTransactionId();
    try {
      // 4️⃣ Create successful transaction
      const [transaction] = await TransactionModel.create(
        [
          {
            customerId: authUser.userId,
            orderId: order._id,
            amount: order.payment.amount,
            currency: appCurrency,
            type: TransactionType.CREDIT,
            paymentBy: PaymentBy.WALLET,
            paymentCurrency: appCurrency,
            reference: referenceId,
            status: TransactionStatus.SUCCESS,
          },
        ],
        { session }
      );

      // 5️⃣ Update order status
      const updatedOrder = await OrderModel.updateOne(
        { _id: order._id },
        {
          'payment.status': PaymentStatus.PAID,
          'payment.transactionId': transaction.id,
          status: OrderStatus.RUNNING,
        },
        { session }
      );

      if (!updatedOrder.modifiedCount) throw new Error('Failed to update order status');

      // 6️⃣ Record wallet transaction history
      const [walletHistory] = await WalletHistoryModel.create(
        [
          {
            walletId: wallet._id,
            prevBalance: wallet.balance,
            amount: order.payment.amount,
            type: WalletHistoryType.DEBIT,
          },
        ],
        { session }
      );

      if (!walletHistory) throw new Error('Failed to create wallet history');

      // 7️⃣ Send notification
      await NotificationModel.create({
        customerId: authUser.userId,
        title: 'Order placed successfully',
        message: 'We’ve received your order and will start processing it shortly.',
        type: NotificationType.INFO,
        category: NotificationCategory.ORDER,
        visitId: orderId,
      });

      await session.commitTransaction();
      return transaction;
    } catch (error) {
      await session.abortTransaction();
      throw new AppError(httpStatus.BAD_REQUEST, GLOBAL_ERROR_MESSAGE);
    } finally {
      await session.endSession();
    }
  }
  async makeOrderLivePayment(authUser: IAuthUser, payload: MakeOrderLivePaymentPayload) {
    const { orderId, methodId } = payload;
    // 1️⃣ Validate payment method
    const method = await LivePaymentMethodModel.findById(methodId);
    if (!method || method.status !== LivePaymentMethodStatus.ACTIVE || !method.isAvailable)
      throw new AppError(httpStatus.NOT_FOUND, 'Live payment method not found or unavailable');

    // 2️⃣ Fetch pending order
    const order = await OrderModel.findOne({
      _id: objectId(orderId),
      customerId: objectId(authUser.userId),
      status: OrderStatus.PENDING,
    });
    if (!order) throw new AppError(httpStatus.NOT_FOUND, 'Order not found');

    // 3️⃣ Load app currency and base info
    const appSettings = (await appSettingService.getAppSettingFromDB()) as AppSetting;
    const appCurrency = appSettings.currency as string;
    const amount = order.payment.amount;

    const referenceId = generateTransactionId();
    let paymentUrl: string | undefined;
    let paymentCurrency = appCurrency;

    // 4️⃣ Prepare base payment payload
    const basePaymentPayload = {
      transactionId: referenceId,
      amount,
      currency: appCurrency,
      successUrl: `${envConfig.url.baseUrlServer}/transactions/${referenceId}/order/live-payment/success`,
      cancelUrl: `${envConfig.url.baseUrlServer}/transactions/${referenceId}/order/live-payment/cancel`,
      service_name: `${order.product.name} × ${order.product.quantity}`,
    };

    // 5️⃣ Handle payment method logic
    switch (method.code) {
      case 'SSLCOMMERZ':
        paymentUrl = await sslcommerzPayment(basePaymentPayload);
        break;

      case 'STRIPE': {
        const exchangeRate = await getCurrencyConversionRate(appCurrency, 'USD', amount);
        if (!exchangeRate) {
          throw new AppError(httpStatus.BAD_REQUEST, 'Currency conversion to USD failed');
        }

        const usdAmount = exchangeRate.convertedAmount;

        const stripePayload = {
          ...basePaymentPayload,
          amount: usdAmount,
          currency: 'usd',
        };

        paymentUrl = await stripePayment(stripePayload);
        paymentCurrency = 'USD';
        break;
      }

      default:
        throw new AppError(httpStatus.BAD_REQUEST, 'Unsupported live payment method');
    }

    // 6️⃣ Create pending transaction
    await TransactionModel.create({
      customerId: authUser.userId,
      orderId,
      amount,
      currency: appCurrency,
      type: TransactionType.CREDIT,
      paymentBy: PaymentBy.LIVE_PAYMENT_METHOD,
      paymentCurrency,
      method: {
        id: methodId,
        name: method.name,
        type: MethodType.LIVE,
      },
      status: TransactionStatus.PENDING,
      reference: referenceId,
    });

    return { paymentUrl };
  }

  async makeWalletAddBalanceLivePayment(
    authUser: IAuthUser,
    payload: MakeWalletAddBalanceLivePaymentPayload
  ) {
    const { amount, methodId } = payload;

    // 1️⃣ Validate and fetch live payment method
    const method = await LivePaymentMethodModel.findById(methodId);
    if (!method || method.status !== LivePaymentMethodStatus.ACTIVE || !method.isAvailable) {
      throw new AppError(httpStatus.NOT_FOUND, 'Live payment method not found or unavailable.');
    }

    // 2️⃣ Load app settings and base currency
    const appSettings = (await appSettingService.getAppSettingFromDB()) as AppSetting;
    const appCurrency = appSettings.currency as string;

    // 3️⃣ Generate unique transaction reference
    const referenceId = generateTransactionId();

    // 4️⃣ Start session for safe transaction handling
    const session = await startSession();
    session.startTransaction();

    try {
      let paymentCurrency = appCurrency;
      let paymentUrl: string | undefined;

      // 5️⃣ Prepare base payment payload
      const basePaymentPayload = {
        transactionId: referenceId,
        amount,
        currency: appCurrency,
        successUrl: `${envConfig.url.baseUrlServer}/transactions/${referenceId}/wallet-add-balance/live-payment/success`,
        cancelUrl: `${envConfig.url.baseUrlServer}/transactions/${referenceId}wallet-add-balance/live-payment/cancel`,
        service_name: 'Wallet Add Balance',
      };

      // 6️⃣ Handle payment based on method
      switch (method.code.trim()) {
        case 'SSLCOMMERZ':
          paymentUrl = await sslcommerzPayment(basePaymentPayload);
          paymentCurrency = 'BDT';
          break;

        case 'STRIPE': {
          // Convert amount from BDT (or app currency) → USD
          const exchangeRate = await convertToUSD(amount, appCurrency);

          const usdRate = exchangeRate?.result?.USD;

          if (!usdRate) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Currency conversion to USD failed.');
          }

          const usdAmount = usdRate;

          paymentCurrency = 'USD';

          const stripePayload = {
            ...basePaymentPayload,
            amount: usdAmount,
            currency: 'usd',
          };

          paymentUrl = await stripePayment(stripePayload);
          break;
        }

        default:
          throw new AppError(httpStatus.BAD_REQUEST, 'Unsupported live payment method.');
      }

      // 7️⃣ Create transaction record with correct paymentCurrency
      const createdTransaction = await TransactionModel.create(
        [
          {
            customerId: authUser.userId,
            amount,
            currency: appCurrency,
            paymentCurrency,
            type: TransactionType.CREDIT,
            paymentBy: PaymentBy.LIVE_PAYMENT_METHOD,
            method: {
              id: methodId,
              name: method.name,
              type: MethodType.LIVE,
            },
            status: TransactionStatus.PENDING,
            reference: referenceId,
          },
        ],
        { session }
      );

      // 8️⃣ Commit DB transaction
      await session.commitTransaction();

      // 9️⃣ Return payment initiation result
      return { paymentUrl };
    } catch (error) {
      console.log(error);
      await session.abortTransaction();
      throw new AppError(httpStatus.BAD_REQUEST, GLOBAL_ERROR_MESSAGE);
    } finally {
      await session.endSession();
    }
  }

  async confirmOrderLivePayment(transactionId: string) {
    const transaction = await TransactionModel.findOne({
      reference: transactionId,
      status: TransactionStatus.PENDING,
    });

    if (!transaction) throw new AppError(httpStatus.NOT_FOUND, 'Transaction not found');

    const order = await OrderModel.findOne({
      _id: transaction.orderId,
      status: OrderStatus.PENDING,
    });

    if (!order) throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
    await OrderModel.updateOne(
      {
        _id: transaction.orderId,
      },
      {
        status: OrderStatus.RUNNING,
        'payment.status': PaymentStatus.PAID,
      }
    );

    await TransactionModel.updateOne(
      {
        _id: transaction._id,
      },
      { status: TransactionStatus.SUCCESS }
    );
    CustomerModel.updateOne({
      _id: order.customerId,
      $inc: {
        ordersCount: 1,
      },
    });
  }
  async cancelOrderLivePayment(transactionId: string) {
    const transaction = await TransactionModel.findOne({
      reference: transactionId,
      status: TransactionStatus.PENDING,
    });

    if (!transaction) throw new AppError(httpStatus.NOT_FOUND, 'Transaction not found');

    await TransactionModel.updateOne(
      {
        _id: transaction._id,
      },
      { status: TransactionStatus.FAILED }
    );
  }

  async cancelWalletAddBalanceLivePayment(refId: string) {
    const transaction = await TransactionModel.findOne({
      reference: refId,
      status: TransactionStatus.PENDING,
    });
    if (!transaction) throw new AppError(httpStatus.NOT_FOUND, 'Transaction not found');
    await TransactionModel.updateOne(
      {
        _id: transaction._id,
      },
      { status: TransactionStatus.FAILED }
    );
    return null;
  }

  async confirmWalletAddBalanceLivePayment(refId: string) {
    const transaction = await TransactionModel.findOne({
      reference: refId,
      status: TransactionStatus.PENDING,
    });
    if (!transaction) throw new AppError(httpStatus.NOT_FOUND, 'Transaction not found');
    const session = await startSession();
    session.startTransaction();

    const wallet = await WalletModel.findOne({
      customerId: transaction.customerId!,
    });

    if (!wallet) throw new AppError(httpStatus.NOT_FOUND, 'Wallet not found');
    try {
      // 6️⃣ Record wallet transaction history
      const [walletHistory] = await WalletHistoryModel.create(
        [
          {
            walletId: wallet._id,
            prevBalance: wallet.balance,
            amount: transaction.amount,
            type: WalletHistoryType.CREDIT,
          },
        ],
        { session }
      );

      if (!walletHistory) throw new Error('Failed to create wallet history');

      // 7️⃣ Send notification
      await NotificationModel.create({
        customerId: transaction.customerId,
        title: 'Balance added successfully to your wallet',
        message: 'Your wallet top-up has been received and is being processed.',
        type: NotificationType.INFO,
        category: NotificationCategory.WALLET,
      });

      const updateStatus = await WalletModel.updateOne(
        {
          _id: wallet._id,
        },
        {
          $inc: {
            balance: transaction.amount,
          },
        }
      );
      console.log(updateStatus);
      await session.commitTransaction();
      return transaction;
    } catch (error) {
      await session.abortTransaction();
      throw new AppError(httpStatus.BAD_REQUEST, GLOBAL_ERROR_MESSAGE);
    } finally {
      await session.endSession();
    }
  }
}

export default new TransactionService();
