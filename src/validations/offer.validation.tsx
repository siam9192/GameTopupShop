import { OfferInfoFieldType } from '@/types/offer.type';
import z from 'zod';
export const createOfferValidation = z
  .object({
    name: z.string().nonempty().max(200),
    platformName: z.string().nonempty().max(50),
    coverPhoto: z
      .instanceof(File, { message: 'Cover photo is required' })
      .refine(file => file.size > 0, 'File cannot be empty'),
    description: z.string().nonempty(),
    infoFields: z.array(
      z.object({
        name: z.string().nonempty().max(100),
        placeholder: z.string().nonempty().max(100).optional(),
        type: z.nativeEnum(OfferInfoFieldType),
        minLength: z.number().nonnegative().nullable().optional(),
        maxLength: z.number().nonnegative().nullable().optional(),
        min: z.number().nonnegative().nullable().optional(),
        max: z.number().nonnegative().nullable().optional(),
        optional: z.boolean(),
      }),
    ),
    price: z.coerce.number().min(1, 'Price must be greater or equal to 1'),
    startDate: z.coerce.date({ message: 'Invalid start date' }),
    endDate: z.coerce.date({ message: 'Invalid end date' }),
  })
  .refine(data => data.endDate > data.startDate, {
    message: 'End date must be after start date',
    path: ['endDate'], // attach error to endDate
  });

export type CreateOfferValidation = z.infer<typeof createOfferValidation>;

const updateOfferValidation = createOfferValidation.partial();

export type UpdateOfferValidation = z.infer<typeof updateOfferValidation>;
export default {
  createOfferValidation,
  updateOfferValidation,
};
