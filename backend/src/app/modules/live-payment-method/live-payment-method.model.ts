import { model, Schema } from 'mongoose';
import { LivePaymentMethod, LivePaymentMethodStatus } from './live-payment-method.interface';

const LivePaymentMethodModelSchema = new Schema<LivePaymentMethod>(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    logo: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(LivePaymentMethodStatus),
    },
    isAvailable: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LivePaymentMethodModel = model<LivePaymentMethod>(
  'LivePaymentMethod',
  LivePaymentMethodModelSchema
);

export default LivePaymentMethodModel;
