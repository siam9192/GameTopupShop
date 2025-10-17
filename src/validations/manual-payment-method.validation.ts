import { ManualPaymentMethodStatus } from '@/types/manual-payment-method.type';
import { z } from 'zod';

const createManualPaymentMethodValidation = z.object({
  name: z.string().nonempty('Name is required').max(50, 'Name max length is 50'),
  logo: z
    .instanceof(File, { message: 'Logo is required' })
    .refine(file => file.size > 0, 'File cannot be empty'),
  numbers: z.array(z.string()).min(1, 'Minimum 1 number is required').optional(),
  description: z
    .string()
    .nonempty('Description is required')
    .max(500000, 'Description max length is 5000'),
});

const updateManualPaymentMethodValidation = createManualPaymentMethodValidation.partial();

const updateManualPaymentMethodStatusValidation = z.object({
  id: z.string(),
  status: z.enum([ManualPaymentMethodStatus.ACTIVE, ManualPaymentMethodStatus.INACTIVE]),
});

export type CreateManualPaymentMethodValidation = z.infer<
  typeof createManualPaymentMethodValidation
>;
export type UpdateManualPaymentMethodValidation = z.infer<
  typeof updateManualPaymentMethodValidation
>;

const manualPaymentMethodValidations = {
  createManualPaymentMethodValidation,
  updateManualPaymentMethodValidation,
  updateManualPaymentMethodStatusValidation,
};

export default manualPaymentMethodValidations;
