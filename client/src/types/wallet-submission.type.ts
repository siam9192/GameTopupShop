import { Customer } from './customer.type';
import { ManualPaymentMethod } from './manual-payment-method.type';

export interface WalletSubmission {
  _id: string;
  customerId: string;
  customer: Customer;
  methodId: string;
  methodName: string;
  method: ManualPaymentMethod;
  amount: number;
  note: string;
  declineReason?: string;
  status: WalletSubmissionStatus;
  createdAt: string;
  updatedAt: string;
}

export enum WalletSubmissionStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  DECLINED = 'Declined',
}

export type CreateWalletSubmissionPayload = Pick<WalletSubmission, 'methodId' | 'amount' | 'note'>;

export type DeclineWalletSubmissionPayload = {
  declineReason: string;
};

export type WalletSubmissionsFilterPayload = Partial<{
  searchTerm: string;
  customerId: string;
  methodName: string;
  minAmount: string | number;
  maxAmount: string | number;
  status: WalletSubmissionStatus;
}>;
