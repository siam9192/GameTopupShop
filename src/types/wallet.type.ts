import { Types } from 'mongoose';
import { Customer } from './customer.type';

export interface IWalletHistory {
  _id: Types.ObjectId;
  walletId: Types.ObjectId;
  title: string;
  amount: string;
  createdAt: string;
  updatedAt: string;
}

export interface Wallet {
  _id: string;
  customerId: string;
  customer: Customer;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface WalletsFilterPayload
  extends Partial<{
    searchTerm: string;
    id: string;
    customerId: string;
    minBalance: string;
    maxBalance: string;
  }> {}
export interface UpdateWalletBalancePayload {
  id: string;
  balance: number;
}
