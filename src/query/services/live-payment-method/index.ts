import {
  getLivePaymentMethodById,
  getLivePaymentMethods,
  getPublicLivePaymentMethodById,
  getPublicLivePaymentMethods,
  updateLivePaymentMethodStatus,
} from '@/api-services/live-payment-method';
import useFetch from '@/query/client/useFetch';
import useMutate from '@/query/client/useMutation';
import { LivePaymentMethod, UpdateLivePaymentMethodStatus } from '@/types/live-payment-method.type';
import { Param } from '@/types/metadata.type';
import { IResponse } from '@/types/response.type';

export function getLivePaymentMethodsQuery(params: Param[]) {
  return useFetch<IResponse<LivePaymentMethod[]>>(['getLivePaymentMethods'], () =>
    getLivePaymentMethods(params),
  );
}

export function getPublicLivePaymentMethodsQuery(params: Param[]) {
  return useFetch<IResponse<LivePaymentMethod[]>>(['getPublicLivePaymentMethods'], () =>
    getPublicLivePaymentMethods(params),
  );
}

export function getPublicLivePaymentMethodByIdQuery(id: string) {
  return useFetch<IResponse<LivePaymentMethod>>(['getPublicLivePaymentMethodById', id], () =>
    getPublicLivePaymentMethodById(id),
  );
}

export function getLivePaymentMethodByIdQuery(id: string) {
  return useFetch<IResponse<LivePaymentMethod>>(['getLivePaymentMethodById', id], () =>
    getLivePaymentMethodById(id),
  );
}

export function updateLivePaymentMethodStatusMutation() {
  return useMutate<IResponse<null>, UpdateLivePaymentMethodStatus>(updateLivePaymentMethodStatus);
}
