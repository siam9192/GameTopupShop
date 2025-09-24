import {
  deleteCustomer,
  getCustomerById,
  getCustomers,
  updateCustomerStatus,
} from '@/api-services/customer';
import useFetch from '@/query/client/useFetch';
import useMutate from '@/query/client/useMutation';
import { Customer } from '@/types/customer.type';
import { Param } from '@/types/metadata.type';
import { IResponse } from '@/types/response.type';
import { AccountStatus } from '@/types/user.type';

export function getCustomersQuery(params: Param[]) {
  return useFetch<IResponse<Customer[]>>(['getCustomers'], () => getCustomers(params), {});
}

export function getCustomerByIdQuery(id: string) {
  return useFetch<IResponse<Customer>>(['getCustomerById', id], () => getCustomerById(id), {
    enabled: !!id,
  });
}

export function updateCustomerStatusMutation() {
  return useMutate<IResponse<Customer>, { id: string; status: AccountStatus }>(
    updateCustomerStatus,
  );
}

export function deleteCustomerMutation() {
  return useMutate<IResponse<null>, string>(deleteCustomer);
}
