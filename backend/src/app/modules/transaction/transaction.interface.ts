import { Document, Types } from 'mongoose';

export interface Transaction extends Document {
  customerId: Types.ObjectId;
  orderId?: Types.ObjectId;
  amount: number;
  currency: string;
  type: TransactionType;
  paymentBy: PaymentBy;
  paymentCurrency: string;
  method?: TransactionMethod;
  reference?: string;
  description?: string;
  category: TransactionCategory;
  status: TransactionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type TransactionMethod = {
  id: string;
  name: string;
  type: MethodType;
};

export enum MethodType {
  MANUAL = 'Manual',
  LIVE = 'Live',
}

export enum TransactionType {
  CREDIT = 'Credit', // money added
  DEBIT = 'Debit', // money deducted
}

export enum TransactionCategory {
  WALLET = 'Wallet',
  ORDER = 'Order',
  REFUND = 'Refund',
  PAYMENT = 'Payment',
  ADJUSTMENT = 'Adjustment', // manual admin adjustment
}

export enum TransactionStatus {
  PENDING = 'Pending',
  SUCCESS = 'Success',
  FAILED = 'Failed',
}

export enum PaymentBy {
  WALLET = 'Wallet',
  CARD = 'Card',
  CASH = 'Cash',
  LIVE_PAYMENT_METHOD = 'Live Payment Method',
  MANUAL_PAYMENT_METHOD = 'Manual Payment Method',
}

export interface TransactionsFilterPayload
  extends Partial<{
    id: string;
    orderId: string;
    customerId: string;

    status: TransactionStatus;
    minAmount: string;
    maxAmount: string;
  }> {}

export interface UpdateTransactionStatusPayload {
  id: string;
  status: TransactionStatus;
}

export interface MakeOrderLivePaymentPayload {
  orderId: string;
  methodId: string;
}

export interface MakeWalletAddBalanceLivePaymentPayload {
  amount: number;
  methodId: string;
}

export interface MakeWalletPaymentPayload {
  orderId: string;
}

export enum LivePaymentMethod {
  SSLCOMMERZ = 'Sslcommerz',
  STRIPE = 'Stripe',
}
