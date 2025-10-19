
import { getLivePaymentMethodById, getLivePaymentMethods, updateLivePaymentMethodStatus } from '@/api-services/live-payment-method';
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

export function getLivePaymentMethodByIdQuery(id: string) {
  return useFetch<IResponse<LivePaymentMethod>>(['getLivePaymentMethodById', id], () =>
    getLivePaymentMethodById(id),
  );
}


export function updateLivePaymentMethodStatusMutation() {
  return useMutate<IResponse<null>, UpdateLivePaymentMethodStatus>(
    updateLivePaymentMethodStatus,
  );
}
