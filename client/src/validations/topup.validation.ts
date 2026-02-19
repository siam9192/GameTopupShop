import { TopupInfoFieldType, TopupPackageStatus } from '@/types/topup.type';
import z from 'zod';

const createTopupValidation = z.object({
  name: z
    .string()
    .nonempty('Topup name is required')
    .max(200, 'Topup name must not exceed 200 characters'),

  platformName: z
    .string()
    .nonempty('Platform name is required')
    .max(50, 'Platform name must not exceed 50 characters'),

  packages: z
    .array(
      z.object({
        name: z
          .string()
          .nonempty('Package name is required')
          .max(100, 'Package name must not exceed 100 characters'),
        price: z.number({ message: 'Price must be a number' }).min(0, 'Price cannot be negative'),
        status: z.nativeEnum(TopupPackageStatus),
      }),
    )
    .min(1, 'At least one package is required'),

  coverPhoto: z.instanceof(File, { message: 'Cover photo is required' }),

  description: z.string().nonempty('Description is required'),

  infoFields: z
    .array(
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
      }),
    )
    .min(1, 'At least one info field is required'),
});
export type CreateTopupValidation = z.infer<typeof createTopupValidation>;

const updateTopupValidation = createTopupValidation.partial();

export type UpdateTopupValidation = z.infer<typeof updateTopupValidation>;
export default {
  createTopupValidation,
  updateTopupValidation,
};
