import { Types } from 'mongoose';

export interface WalletHistory {
  _id: Types.ObjectId;
  walletId: Types.ObjectId;
  title: string;
  amount: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Wallet {
  _id: Types.ObjectId;
  customerId: Types.ObjectId;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
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
