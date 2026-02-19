import { getWalletHistories, getWalletHistoryById } from '@/api-services/wallet-history';
import useFetch from '@/query/client/useFetch';
import { Param } from '@/types/metadata.type';
import { IResponse } from '@/types/response.type';
import { WalletHistory } from '@/types/wallet-history.type';

export function getWalletsHistoriesQuery(params: Param[]) {
  return useFetch<IResponse<WalletHistory[]>>(['getWalletHistories'], () =>
    getWalletHistories(params),
  );
}

export function getWalletHistoryByIdQuery(id: string) {
  return useFetch<IResponse<WalletHistory>>(['getWalletHistoryById', id], () =>
    getWalletHistoryById(id),
  );
}
