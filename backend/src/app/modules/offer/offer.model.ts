import { model, Schema } from 'mongoose';
import { Offer, OfferInfoField, OfferInfoFieldType, OfferStatus } from './offer.interface';

const InfoFieldSchema = new Schema<OfferInfoField>(
  {
    name: { type: String, required: true },
    placeholder: { type: String, default: null },
    type: { type: String, enum: Object.values(OfferInfoFieldType), required: true },
    minLength: { type: Number, default: null },
    maxLength: { type: Number, default: null },
    min: { type: Number, default: null },
    max: { type: Number, default: null },
    optional: { type: Boolean, required: true, default: false },
  },
  { _id: false }
);

const OfferModelSchema: Schema<Offer> = new Schema(
  {
    name: { type: String, required: true },
    platformName: { type: String, required: true },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    coverPhoto: { type: String, required: true },
    description: { type: String, required: true },
    infoFields: { type: [InfoFieldSchema], required: true },
    ordersCount: {
      type: Number,
      min: 0,
      default: 0,
    },
    status: {
      type: String,
      enum: Object.values(OfferStatus),
      default: OfferStatus.PENDING,
      required: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    updatedAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

const OfferModel = model<Offer>('Offer', OfferModelSchema);

export default OfferModel;
