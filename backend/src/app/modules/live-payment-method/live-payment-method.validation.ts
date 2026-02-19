import { z } from 'zod';
import { LivePaymentMethodStatus } from './live-payment-method.interface';

const updateLivePaymentMethodStatus = z.object({
  id: z.string(),
  status: z.nativeEnum(LivePaymentMethodStatus),
});

const livePaymentMethodValidations = {
  updateLivePaymentMethodStatus,
};

export default livePaymentMethodValidations;
