import {
  createManualPaymentMethod,
  deleteManualPaymentMethod,
  getManualPaymentMethodById,
  getManualPaymentMethods,
  updateManualPaymentMethod,
  updateManualPaymentMethodStatus,
} from '@/api-services/manual-payment-method';
import useFetch from '@/query/client/useFetch';
import useMutate from '@/query/client/useMutation';
import {
  CreateManualPaymentMethodPayload,
  ManualPaymentMethod,
  UpdateManualPaymentMethodPayload,
  UpdateManualPaymentMethodStatusPayload,
} from '@/types/manual-payment-method.type';
import { Param } from '@/types/metadata.type';
import { IResponse } from '@/types/response.type';

export function getManualPaymentMethodsQuery(params: Param[]) {
  return useFetch<IResponse<ManualPaymentMethod[]>>(['getManualPaymentMethods'], () =>
    getManualPaymentMethods(params),
  );
}

export function getManualPaymentMethodByIdQuery(id: string) {
  return useFetch<IResponse<ManualPaymentMethod>>(['getManualPaymentMethodById', id], () =>
    getManualPaymentMethodById(id),
  );
}

export function updateManualPaymentMethodMutation() {
  return useMutate<
    IResponse<ManualPaymentMethod>,
    { id: string; payload: UpdateManualPaymentMethodPayload }
  >(updateManualPaymentMethod);
}

export function createManualPaymentMethodMutation() {
  return useMutate<IResponse<ManualPaymentMethod>, CreateManualPaymentMethodPayload>(
    createManualPaymentMethod,
  );
}

export function updateManualPaymentMethodStatusMutation() {
  return useMutate<IResponse<null>, UpdateManualPaymentMethodStatusPayload>(
    updateManualPaymentMethodStatus,
  );
}

export function deleteManualPaymentMethodMutation() {
  return useMutate<IResponse<null>, string>(deleteManualPaymentMethod);
}
