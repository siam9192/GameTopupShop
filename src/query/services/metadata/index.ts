import {
  getAdminDashboardMetadata,
  getCustomerDashboardMetadata,
  getCustomerWalletMetadata,
  getProductsMetadata,
  getUsersMetadata,
} from '@/api-services/metadata';
import { updateUserProfile } from '@/api-services/user';
import useFetch from '@/query/client/useFetch';
import useMutate from '@/query/client/useMutation';
import { Administrator, UpdateAdministratorProfilePayload } from '@/types/administrator.type';
import { Customer, UpdateCustomerProfilePayload } from '@/types/customer.type';
import {
  AdminDashboardMetaData,
  CustomerDashboardMetaData,
  CustomerWalletMetaData,
  ModeratorDashboardMetaData,
  ProductsMetadata,
  SuperAdminDashboardMetaData,
  UsersMetadata,
} from '@/types/metadata.type';
import { IResponse } from '@/types/response.type';

export function getUsersMetadataQuery() {
  return useFetch<IResponse<UsersMetadata>>(['getUsersMetadata'], getUsersMetadata);
}

export function getProductsMetadataQuery() {
  return useFetch<IResponse<ProductsMetadata>>(['getProductsMetadata'], getProductsMetadata);
}

export function getSuperAdminDashboardMetadataQuery() {
  return useFetch<IResponse<SuperAdminDashboardMetaData>>(
    ['getSuperAdminDashboardMetadata'],
    getSuperAdminDashboardMetadataQuery,
  );
}

export function getAdminDashboardMetadataQuery() {
  return useFetch<IResponse<AdminDashboardMetaData>>(
    ['getAdminDashboardMetadata'],
    getAdminDashboardMetadata,
  );
}

export function getModeratorDashboardMetadataQuery() {
  return useFetch<IResponse<ModeratorDashboardMetaData>>(
    ['getModeratorDashboardMetadata'],
    getModeratorDashboardMetadataQuery,
  );
}

export function getCustomerDashboardMetadataQuery() {
  return useFetch<IResponse<CustomerDashboardMetaData>>(
    ['getCustomerDashboardMetadata'],
    getCustomerDashboardMetadata,
  );
}

export function getCustomerWalletMetadataQuery() {
  return useFetch<IResponse<CustomerWalletMetaData>>(
    ['getCustomerWalletMetadata'],
    getCustomerWalletMetadata,
  );
}

export function updateUserProfileMutation() {
  return useMutate<
    IResponse<Customer | Administrator>,
    UpdateCustomerProfilePayload | UpdateAdministratorProfilePayload
  >(updateUserProfile);
}
