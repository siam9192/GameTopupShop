import { getSearchProducts } from '@/api-services/utils';
import useFetch from '@/query/client/useFetch';
import { Param } from '@/types/metadata.type';
import { IResponse } from '@/types/response.type';
import { SearchProduct } from '@/types/utils.type';

export function getSearchProductsQuery(params: Param[]) {
  return useFetch<IResponse<SearchProduct[]>>(
    ['getSearchProducts'],
    () => getSearchProducts(params),
    {
      enabled: false,
    },
  );
}
