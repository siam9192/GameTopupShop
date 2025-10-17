import { AppCurrency, AppStatus } from '@/types/app-setting.type';
import { z } from 'zod';

const url = z.string().url();
const optionalUrl = url.optional();

export const updateAppSettingValidation = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Application name is required.' })
      .max(50, { message: 'Application name must not exceed 50 characters.' })
      .optional(),

    logo: z
      .any()
      .refine(file => !file || file instanceof File, {
        message: 'Logo must be a valid file.',
      })
      .optional(),

    favicon: z
      .any()
      .refine(file => !file || file instanceof File, {
        message: 'Favicon must be a valid file.',
      })
      .optional(),

    description: z
      .string()
      .max(300, { message: 'Description cannot exceed 300 characters.' })
      .optional(),

    supportEmail: z
      .string()
      .email({ message: 'Support email must be a valid email address.' })
      .optional(),

    phoneNumber: z
      .string()
      .min(5, { message: 'Phone number must be at least 5 digits.' })
      .max(20, { message: 'Phone number cannot exceed 20 digits.' })
      .optional(),

    address: z.string().max(200, { message: 'Address cannot exceed 200 characters.' }).optional(),

    currency: z
      .nativeEnum(AppCurrency, {
        message: 'Invalid currency. Choose from BDT, USD, or EUR.',
      })
      .optional(),

    timezone: z.string().optional(),
    language: z.string().optional(),

    socialLinks: z
      .object({
        facebook: optionalUrl,
        twitter: optionalUrl,
        instagram: optionalUrl,
        linkedin: optionalUrl,
        youtube: optionalUrl,
      })
      .partial()
      .optional(),

    notification: z
      .object({
        enableCustomerNotification: z.boolean({ message: 'Must be a boolean value.' }).optional(),
        enableAdministratorNotification: z
          .boolean({ message: 'Must be a boolean value.' })
          .optional(),
      })
      .optional(),

    order: z
      .object({
        enableTopupOrder: z.boolean({ message: 'Must be a boolean value.' }).optional(),
        enableOfferOrder: z.boolean({ message: 'Must be a boolean value.' }).optional(),
      })
      .optional(),

    wallet: z
      .object({
        enableAddBalance: z.boolean({ message: 'Must be a boolean value.' }).optional(),
        enableWalletSubmission: z.boolean({ message: 'Must be a boolean value.' }).optional(),
      })
      .optional(),

    appStatus: z
      .nativeEnum(AppStatus, {
        message:
          'Invalid application status. Choose from Open, Closed, Maintenance, Suspended, or Coming Soon.',
      })
      .optional(),
  })
  .strict()
  .refine(obj => Object.keys(obj).length > 0, {
    message: 'At least one field must be provided for update.',
  });

// If you want a TS type from this schema:
export type UpdateAppSettingValidation = z.infer<typeof updateAppSettingValidation>;

const appSettingValidations = {
  updateAppSettingValidation,
};
export default appSettingValidations;
