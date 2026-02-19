import { z } from 'zod';
import { TopupInfoFieldType, TopupPackageStatus, TopupStatus } from './topup.interface';

const createTopupValidation = z.object({
  name: z.string().nonempty().max(200),
  platformName: z.string().nonempty().max(50),
  packages: z.array(
    z.object({
      name: z.string().nonempty().max(100),
      price: z.number().min(0),
      status: z.nativeEnum(TopupPackageStatus),
    })
  ),
  coverPhoto: z.string().url(),
  description: z.string().nonempty(),

  infoFields: z.array(
    z.object({
      name: z
        .string()
        .nonempty('Field name is required')
        .max(100, 'Field name must not exceed 100 characters'),
      placeholder: z
        .string()
        .max(100, 'Placeholder must not exceed 100 characters')
        .nullable()
        .optional(),
      type: z.nativeEnum(TopupInfoFieldType),
      minLength: z
        .number()
        .nonnegative('Minimum length must be non-negative')
        .nullable()
        .optional(),
      maxLength: z
        .number()
        .nonnegative('Maximum length must be non-negative')
        .nullable()
        .optional(),
      min: z.number().nonnegative('Minimum value must be non-negative').nullable().optional(),
      max: z.number().nonnegative('Maximum value must be non-negative').nullable().optional(),
      optional: z.boolean({
        message: 'Optional must be true or false',
      }),
    })
  ),
});

const updateTopupValidation = createTopupValidation.partial();

const updateTopupStatus = z.object({
  id: z.string(),
  status: z.nativeEnum(TopupStatus),
});

const topupValidations = {
  createTopupValidation,
  updateTopupValidation,
  updateTopupStatus,
};

export default topupValidations;
