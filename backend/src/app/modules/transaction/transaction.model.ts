import mongoose, { Schema, model } from 'mongoose';
import {
  MethodType,
  PaymentBy,
  Transaction,
  TransactionMethod,
  TransactionStatus,
  TransactionType,
} from './transaction.interface';

const TransactionModelSchema: Schema = new Schema<Transaction>(
  {
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', default: null },

    amount: { type: Number, required: true },
    currency: { type: String, required: true },

    type: { type: String, enum: Object.values(TransactionType), required: true },
    method: {
      type: new Schema<TransactionMethod>(
        {
          id: {
            type: String,
            required: true,
          },
          type: { type: String, enum: Object.values(MethodType), required: true },
        },
        {
          _id: false,
        }
      ),
      default: null,
    },
    paymentBy: {
      type: String,
      enum: Object.values(PaymentBy),
      required: true,
    },
    paymentCurrency: {
      type: String,
      required: true,
    },
    reference: { type: String, required: true },
    description: { type: String },

    status: { type: String, enum: Object.values(TransactionStatus), required: true },
  },
  {
    timestamps: true,
  }
);

const TransactionModel = model<Transaction>('Transaction', TransactionModelSchema);
export default TransactionModel;
