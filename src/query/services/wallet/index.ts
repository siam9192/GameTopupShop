import { getWalletById, getWallets, updateWalletBalance } from '@/api-services/wallet';
import useFetch from '@/query/client/useFetch';
import useMutate from '@/query/client/useMutation';
import { Param } from '@/types/metadata.type';
import { IResponse } from '@/types/response.type';
import { UpdateWalletBalancePayload, Wallet } from '@/types/wallet.type';

export function getWalletsQuery(params: Param[]) {
  return useFetch<IResponse<Wallet[]>>(['getWallets'], () => getWallets(params));
}

export function getWalletByIdQuery(id: string) {
  return useFetch<IResponse<Wallet>>(['getWalletById', id], () => getWalletById(id));
}

export function updateWalletBalanceMutation() {
  return useMutate<IResponse<Wallet>, UpdateWalletBalancePayload>(updateWalletBalance);
}
