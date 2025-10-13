import { getProductsMetadata, getUsersMetadata } from '@/api-services/metadata';
import useFetch from '@/query/client/useFetch';
import { ProductsMetadata, UsersMetadata } from '@/types/metadata.type';
import { IResponse } from '@/types/response.type';

export function getUsersMetadataQuery() {
  return useFetch<IResponse<UsersMetadata>>(['getUsersMetadata'], getUsersMetadata);
}

export function getProductsMetadataQuery() {
  return useFetch<IResponse<ProductsMetadata>>(['getProductsMetadata'], getProductsMetadata);
}
