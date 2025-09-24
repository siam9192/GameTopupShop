import { getUsersMetadata } from '@/api-services/metadata';
import useFetch from '@/query/client/useFetch';
import { IResponse } from '@/types/response.type';

export function getUsersMetadataQuery() {
  return useFetch<IResponse<UsersMetadata>>(['getUsersMetadata'], getUsersMetadata);
}
