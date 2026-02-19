import envConfig from '../../config/env.config';
import { paginationOptionPicker } from '../../helpers/paginationHelper';
import httpStatus from '../../shared/http-status';
import catchAsync from '../../utils/catchAsync';
import Pick from '../../utils/pick';
import { sendSuccessResponse } from '../../utils/response';
import transactionService from './transaction.service';

class TransactionController {
  getTransactions = catchAsync(async (req, res) => {
    const result = await transactionService.getTransactionsFromDB(
      Pick(req.query, ['id', 'customerId', 'orderId', 'method', 'status']),
      paginationOptionPicker(req.query)
    );
    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      ...result,
      message: 'Transactions retrieved Successfully',
    });
  });

  getMyTransactions = catchAsync(async (req, res) => {
    const result = await transactionService.getMyTransactionsFromDB(
      req.user,
      Pick(req.query, ['id', 'orderId', 'method', 'status']),
      paginationOptionPicker(req.query)
    );
    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      ...result,
      message: 'Transactions retrieved Successfully',
    });
  });

  getTransactionById = catchAsync(async (req, res) => {
    const result = await transactionService.getTransactionByIdFromDB(req.user, req.params.id);
    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Transactions retrieved Successfully',
    });
  });

  updateTransactionStatus = catchAsync(async (req, res) => {
    const result = await transactionService.updateTransactionStatusIntoDB(req.body);
    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Transaction status updated successfully',
    });
  });
  makeOrderWalletPayment = catchAsync(async (req, res) => {
    const result = await transactionService.makeOrderWalletPayment(req.user, req.body);
    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Wallet payment successful',
    });
  });
  makeOrderLivePayment = catchAsync(async (req, res) => {
    console.log('Hello world', req.body);
    const result = await transactionService.makeOrderLivePayment(req.user, req.body);

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Live payment successful',
    });
  });

  makeWalletAddBalanceLivePayment = catchAsync(async (req, res) => {
    const result = await transactionService.makeWalletAddBalanceLivePayment(req.user, req.body);
    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Live payment successful',
    });
  });

  confirmOrderLivePayment = catchAsync(async (req, res) => {
    const result = await transactionService.confirmOrderLivePayment(req.params.refId);
    res.redirect(`${envConfig.url.baseUrlClient}/dashboard/orders`);
  });

  cancelOrderLivePayment = catchAsync(async (req, res) => {
    const result = await transactionService.cancelOrderLivePayment(req.params.refId);
    res.redirect(`${envConfig.url.baseUrlClient}/payment-failed`);
  });

  confirmWalletAddBalancePayment = catchAsync(async (req, res) => {
    const result = await transactionService.confirmWalletAddBalanceLivePayment(req.params.refId);
    res.redirect(`${envConfig.url.baseUrlClient}/dashboard/wallet`);
  });

  cancelWalletAddBalancePayment = catchAsync(async (req, res) => {
    const result = await transactionService.cancelWalletAddBalanceLivePayment(req.params.refId);
    res.redirect(`${envConfig.url.baseUrlClient}/dashboard/wallet/add-balance`);
  });
}

export default new TransactionController();
