import { Router } from 'express';
import auth from '../../middlewares/auth';
import { AdministratorLevel } from '../user/user.interface';
import validateRequest from '../../middlewares/validateRequest';
import livePaymentMethodValidations from './live-payment-method.validation';
import livePaymentMethodController from './live-payment-method.controller';

const router = Router();

router.patch(
  '/status',
  auth(AdministratorLevel.SUPER_ADMIN, AdministratorLevel.ADMIN),
  validateRequest(livePaymentMethodValidations.updateLivePaymentMethodStatus),
  livePaymentMethodController.updateLivePaymentMethodStatus
);

router.get(
  '/',
  auth(AdministratorLevel.SUPER_ADMIN, AdministratorLevel.ADMIN),
  livePaymentMethodController.getLivePaymentMethods
);

router.get('/public', livePaymentMethodController.getPublicLivePaymentMethods);

router.get('/public/:id', livePaymentMethodController.getLivePaymentMethodById);

router.get(
  '/:id',
  auth(AdministratorLevel.SUPER_ADMIN, AdministratorLevel.ADMIN),
  livePaymentMethodController.getLivePaymentMethodById
);

const livePaymentMethodRouter = router;

export default livePaymentMethodRouter;
