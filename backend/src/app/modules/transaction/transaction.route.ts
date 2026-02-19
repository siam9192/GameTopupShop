import { Router } from 'express';
import auth from '../../middlewares/auth';
import transactionController from './transaction.controller';
import { UserRole } from '../user/user.interface';
import validateRequest from '../../middlewares/validateRequest';
import transactionValidations from './transaction.validation';

const router = Router();

router.get('/', auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), transactionController.getTransactions);
router.get('/my', auth(UserRole.CUSTOMER), transactionController.getMyTransactions);

router.post(
  '/order-live-payment',
  auth(UserRole.CUSTOMER),
  validateRequest(transactionValidations.makeOrderLivePaymentValidation),
  transactionController.makeOrderLivePayment
);
router.post(
  '/order-wallet-payment',
  auth(UserRole.CUSTOMER),
  validateRequest(transactionValidations.makeOrderWalletPaymentValidation),
  transactionController.makeOrderWalletPayment
);

router.get(
  '/:refId/wallet-add-balance/live-payment/success',
  transactionController.confirmWalletAddBalancePayment
);

router.post(
  '/:refId/wallet-add-balance/live-payment/success',
  transactionController.confirmWalletAddBalancePayment
);

router.get(
  '/:refId/wallet-add-balance/live-payment/cancel',
  transactionController.cancelWalletAddBalancePayment
);

router.get(
  '/:refId/wallet-add-balance/live-payment/cancel',
  transactionController.cancelWalletAddBalancePayment
);

router.get(
  '/:refId/wallet-add-balance/live-payment/success',
  transactionController.confirmWalletAddBalancePayment
);

router.get(
  '/:refId/wallet-add-balance/live-payment/cancel',
  transactionController.cancelWalletAddBalancePayment
);

router.get('/:refId/order/live-payment/success', transactionController.confirmOrderLivePayment);
router.get('/:refId/order/live-payment/cancel', transactionController.cancelOrderLivePayment);

router.post('/:refId/order/live-payment/success', transactionController.confirmOrderLivePayment);
router.post('/:refId/order/live-payment/cancel', transactionController.cancelOrderLivePayment);

router.post(
  '/:id',
  auth(UserRole.CUSTOMER, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  transactionController.getTransactionById
);

router.post(
  '/wallet-add-balance/live-payment',
  auth(UserRole.CUSTOMER),
  validateRequest(transactionValidations.makeWalletAddBalanceLivePaymentValidation),
  transactionController.makeWalletAddBalanceLivePayment
);
router.patch(
  '/status',
  auth(UserRole.SUPER_ADMIN),
  validateRequest(transactionValidations.updateTransactionStatusValidation),
  transactionController.updateTransactionStatus
);

const transactionRouter = router;
export default transactionRouter;
