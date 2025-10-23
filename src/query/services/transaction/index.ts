import {
  getTransactionById,
  getTransactions,
  makeWalletAddBalanceLivePaymentPayload,
} from '@/api-services/transaction';
import useFetch from '@/query/client/useFetch';
import useMutate from '@/query/client/useMutation';
import { Param } from '@/types/metadata.type';
import { IResponse } from '@/types/response.type';
import { MakeWalletAddBalanceLivePaymentPayload, Transaction } from '@/types/transaction.type';

export function getTransactionsQuery(params: Param[]) {
  return useFetch<IResponse<Transaction[]>>(['getTransactions'], () => getTransactions(params));
}

export function getTransactionByIdQuery(id: string) {
  return useFetch<IResponse<Transaction>>(['getTransactionById', id], () => getTransactionById(id));
}

// export function updateTransactionStatusMutation() {
//   return useMutate<IResponse<Transaction>, UpdateWalletBalancePayload>(updateTrans);
// }

export function makeWalletAddBalanceLivePaymentMutation() {
  return useMutate<IResponse<{ paymentUrl: string }>, MakeWalletAddBalanceLivePaymentPayload>(
    makeWalletAddBalanceLivePaymentPayload,
  );
}
