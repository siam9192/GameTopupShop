import { z } from 'zod';
import { OfferInfoFieldType, OfferStatus } from './offer.interface';

const createOfferValidation = z.object({
  name: z.string().nonempty().max(200),
  platformName: z.string().nonempty().max(50),
  coverPhoto: z.string().url(),
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
    })
  ),
  price: z.number().min(0),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
});

const updateOfferValidation = createOfferValidation.partial();

const updateOfferStatus = z.object({
  id: z.string(),
  status: z.nativeEnum(OfferStatus),
});

const offerValidations = {
  createOfferValidation,
  updateOfferValidation,
  updateOfferStatus,
};

export default offerValidations;
