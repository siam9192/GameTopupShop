import { Customer } from './customer.type';
export interface Transaction {
  _id: string;
  customerId: string;
  customer: Customer;
  orderId?: string;
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
  createdAt: string;
  updatedAt: string;
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

export interface MakeOrderWalletPaymentPayload {
  orderId: string;
}
