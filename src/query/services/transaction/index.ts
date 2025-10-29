import {
  getTransactionById,
  getTransactions,
  makeOrderLivePayment,
  makeOrderWalletLivePayment,
  makeWalletAddBalanceLivePayment,
} from '@/api-services/transaction';
import useFetch from '@/query/client/useFetch';
import useMutate from '@/query/client/useMutation';
import { Param } from '@/types/metadata.type';
import { IResponse } from '@/types/response.type';
import {
  MakeOrderLivePaymentPayload,
  MakeOrderWalletPaymentPayload,
  MakeWalletAddBalanceLivePaymentPayload,
  Transaction,
} from '@/types/transaction.type';

export function getTransactionsQuery(params: Param[]) {
  return useFetch<IResponse<Transaction[]>>(['getTransactions'], () => getTransactions(params));
}

export function getTransactionByIdQuery(id: string) {
  return useFetch<IResponse<Transaction>>(['getTransactionById', id], () => getTransactionById(id));
}

export function makeWalletAddBalanceLivePaymentMutation() {
  return useMutate<IResponse<{ paymentUrl: string }>, MakeWalletAddBalanceLivePaymentPayload>(
    makeWalletAddBalanceLivePayment,
  );
}

export function makeOrderLivePaymentMutation() {
  return useMutate<IResponse<{ paymentUrl: string }>, MakeOrderLivePaymentPayload>(
    makeOrderLivePayment,
  );
}

export function makeOrderWalletPaymentMutation() {
  return useMutate<IResponse<{ paymentUrl: string }>, MakeOrderWalletPaymentPayload>(
    makeOrderWalletLivePayment,
  );
}
