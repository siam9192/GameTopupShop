import { subDays } from 'date-fns';
import AppError from '../../Errors/AppError';
import { objectId } from '../../helpers';
import httpStatus from '../../shared/http-status';
import { IAuthUser } from '../../types';
import CustomerModel from '../customer/customer.model';
import { OfferStatus } from '../offer/offer.interface';
import OfferModel from '../offer/offer.model';
import { OrderStatus } from '../order/order.interface';
import OrderModel from '../order/order.model';
import { TopupStatus } from '../topup/topup.interface';
import TopupModel from '../topup/topup.model';
import { AccountStatus } from '../user/user.interface';
import { WalletSubmissionStatus } from '../wallet-submission/wallet-submission.interface';
import WalletSubmissionModel from '../wallet-submission/wallet-submission.model';
import WalletModel from '../wallet/wallet.model';
import WalletHistoryModel from '../wallet-history/wallet-history.model';
import { WalletHistoryType } from '../wallet-history/wallet-history.interface';

class MetadataService {
  async getSuperAdminMetadata() {
    const topups = await TopupModel.countDocuments({
      status: { $ne: TopupStatus.DELETED },
    });
    const offers = await OfferModel.countDocuments({
      status: { $ne: TopupStatus.DELETED },
    });

    const orders = await OrderModel.countDocuments({
      status: { $ne: OrderStatus.PENDING },
    });

    const revenue = (
      await OrderModel.aggregate([
        {
          $match: {
            status: OrderStatus.COMPLETED,
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$payment.amount' },
          },
        },
      ])
    )[0].total;

    const customers = await CustomerModel.countDocuments({
      status: { $ne: AccountStatus.DELETED },
    });
    const administrators = await CustomerModel.countDocuments({
      status: { $ne: AccountStatus.DELETED },
    });

    const users = customers + administrators;
    const products = topups + offers;

    return {
      users,
      revenue,
      products,
      orders,
    };
  }
  async getAdminMetadata() {
    const topups = await TopupModel.countDocuments({
      status: { $ne: TopupStatus.DELETED },
    });
    const offers = await OfferModel.countDocuments({
      status: { $ne: TopupStatus.DELETED },
    });

    const orders = await OrderModel.countDocuments({
      status: { $ne: OrderStatus.PENDING },
    });

    const revenue = (
      await OrderModel.aggregate([
        {
          $match: {
            status: OrderStatus.COMPLETED,
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$payment.amount' },
          },
        },
      ])
    )[0].total;

    const customers = await CustomerModel.countDocuments({
      status: { $ne: AccountStatus.DELETED },
    });

    const products = topups + offers;

    return {
      customers,
      revenue,
      products,
      orders,
    };
  }
  async getModeratorMetadata() {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const topups = await TopupModel.countDocuments({
      status: { $ne: TopupStatus.DELETED },
    });
    const offers = await OfferModel.countDocuments({
      status: { $ne: TopupStatus.DELETED },
    });

    const orders = await OrderModel.countDocuments({
      status: { $ne: OrderStatus.PENDING },
    });

    const customers = await CustomerModel.countDocuments({
      status: { $ne: AccountStatus.DELETED },
    });
    const administrators = await CustomerModel.countDocuments({
      status: { $ne: AccountStatus.DELETED },
    });

    const users = customers + administrators;

    const runningOrders = await OrderModel.countDocuments({
      status: { $ne: OrderStatus.RUNNING },
    });

    const newCustomers = await CustomerModel.countDocuments({
      status: { $ne: AccountStatus.DELETED },
      createdAt: { $gte: startOfToday, $lte: endOfToday },
    });

    const products = topups + offers;

    return {
      products,
      orders,
      runningOrders,
      newCustomers,
    };
  }

  async getCustomerMetadata(authUser: IAuthUser) {
    const wallet = await WalletModel.findOne({ customerId: objectId(authUser.userId) });

    if (!wallet) {
      throw new AppError(httpStatus.NOT_FOUND, 'Wallet not found');
    }

    const orderInProcess = await OrderModel.countDocuments({
      customerId: objectId(authUser.userId),
      status: OrderStatus.RUNNING,
    });

    const ordersCompleted = await OrderModel.countDocuments({
      customerId: objectId(authUser.userId),
      status: OrderStatus.COMPLETED,
    });

    const ordersAmount = (
      await OrderModel.aggregate([
        {
          $match: {
            customerId: objectId(authUser.userId),
            status: { $in: [OrderStatus.RUNNING, OrderStatus.COMPLETED] },
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: '$payment.amount' },
          },
        },
      ])
    )[0]?.totalAmount;

    const pendingWalletAmount = (
      await WalletSubmissionModel.aggregate([
        {
          $match: {
            customerId: objectId(authUser.userId),
            status: WalletSubmissionStatus.PENDING,
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: '$amount' },
          },
        },
      ])
    )[0]?.totalAmount;

    return {
      walletBalance: wallet.balance,
      pendingWalletAmount,
      orderInProcess,
      ordersCompleted,
      ordersAmount,
    };
  }

  async getUsersMetadata() {
    const customers = await CustomerModel.countDocuments({
      status: { $ne: AccountStatus.DELETED },
    });
    const administrators = await CustomerModel.countDocuments({
      status: { $ne: AccountStatus.DELETED },
    });

    const blockedCustomers = await CustomerModel.countDocuments({
      status: AccountStatus.BLOCKED,
    });
    const blockedAdministrators = await CustomerModel.countDocuments({
      status: AccountStatus.BLOCKED,
    });
    const users = customers + administrators;
    const blockedUsers = blockedAdministrators + blockedCustomers;

    return {
      users,
      customers,
      administrators,
      blockedUsers,
    };
  }
  async getProductsMetadata() {
    const topups = await TopupModel.countDocuments({
      status: { $ne: TopupStatus.DELETED },
    });
    const offers = await OfferModel.countDocuments({
      status: { $ne: TopupStatus.DELETED },
    });

    const inactiveTopups = await TopupModel.countDocuments({
      status: TopupStatus.ACTIVE,
    });

    const inactiveOffers = await TopupModel.countDocuments({
      status: OfferStatus.PAUSED,
    });

    const newTopups = await TopupModel.countDocuments({
      createdAt: { $gte: subDays(new Date(), 15) }, // last 30 days
      status: { $ne: TopupStatus.DELETED },
    }).sort({ createdAt: -1 });

    const newOffers = await OfferModel.countDocuments({
      createdAt: { $gte: subDays(new Date(), 15) }, // last 30 days
      status: { $ne: TopupStatus.DELETED },
    }).sort({ createdAt: -1 });

    return {
      products: topups + offers,
      inactive: inactiveTopups + inactiveOffers,
      topups,
      offers,
      newProducts: newTopups + newOffers,
    };
  }

  async getCustomerWalletMeta(authUser: IAuthUser) {
    const wallet = await WalletModel.findOne({
      customerId: objectId(authUser.userId),
    });

    if (!wallet) throw new AppError(httpStatus.NOT_FOUND, 'Wallet not found');

    const totalSpendResult = await WalletHistoryModel.aggregate([
      {
        $match: {
          walletId: wallet._id,
          type: WalletHistoryType.DEBIT,
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
        },
      },
    ]);

    const totalSpend = totalSpendResult[0]?.totalAmount || 0;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const totalSpend30DaysResult = await WalletHistoryModel.aggregate([
      {
        $match: {
          walletId: wallet._id,
          type: WalletHistoryType.DEBIT,
          createdAt: { $gte: thirtyDaysAgo }, // only last 30 days
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
        },
      },
    ]);

    const totalSpendLast30Days = totalSpend30DaysResult[0]?.totalAmount || 0;
    const pendingAmountResult = await WalletSubmissionModel.aggregate([
      {
        $match: {
          customerId: objectId(authUser.userId),
          status: WalletSubmissionStatus.PENDING,
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
        },
      },
    ]);

    const pendingAmount = pendingAmountResult[0]?.totalAmount || 0;

    return {
      balance: wallet.balance,
      totalSpend,
      totalSpendLast30Days,
      pendingAmount,
    };
  }
}

export default new MetadataService();
4;
