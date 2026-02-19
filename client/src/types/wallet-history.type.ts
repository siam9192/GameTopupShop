export interface WalletHistory {
  _id: string;
  walletId: string;
  prevBalance: number;
  amount: number;
  type: WalletHistoryType;
  createdAt: Date;
  updatedAt: Date;
}

export enum WalletHistoryType {
  CREDIT = 'Credit',
  DEBIT = 'Debit',
}
