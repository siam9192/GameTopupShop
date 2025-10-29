import {
  createTopup,
  deleteTopup,
  getFeaturedTopups,
  getPopularTopups,
  getPublicTopupById,
  getPublicTopups,
  getTopupById,
  getTopups,
  updateTopup,
  updateTopupStatus,
} from '@/api-services/topup';
import useFetch from '@/query/client/useFetch';
import useMutate from '@/query/client/useMutation';
import { Param } from '@/types/metadata.type';
import { IResponse } from '@/types/response.type';
import {
  CreateTopupPayload,
  Topup,
  UpdateTopupPayload,
  UpdateTopupStatusPayload,
} from '@/types/topup.type';

export function getTopupsQuery(params: Param[]) {
  return useFetch<IResponse<Topup[]>>(['getTopups'], () => getTopups(params));
}

export function getPublicTopupsQuery(params: Param[]) {
  return useFetch<IResponse<Topup[]>>(['getPublicTopups'], () => getPublicTopups(params));
}

export function getPublicTopupByIdQuery(id: string) {
  return useFetch<IResponse<Topup>>(['getPublicTopupById', id], () => getPublicTopupById(id));
}

export function getTopupByIdQuery(id: string) {
  return useFetch<IResponse<Topup>>(['getTopupById', id], () => getTopupById(id));
}

export function getPopularTopupsQuery(params: Param[]) {
  return useFetch<IResponse<Topup[]>>(['getPopularTopups'], () => getPopularTopups(params));
}

export function getFeaturedTopupsQuery(params: Param[]) {
  return useFetch<IResponse<Topup[]>>(['getFeaturedTopups'], () => getFeaturedTopups(params));
}

export function updateTopupStatusMutation() {
  return useMutate<IResponse<Topup>, UpdateTopupStatusPayload>(updateTopupStatus);
}

export function createTopupMutation() {
  return useMutate<IResponse<Topup>, CreateTopupPayload>(createTopup);
}

export function updateTopupMutation() {
  return useMutate<IResponse<null>, { id: string; payload: UpdateTopupPayload }>(updateTopup);
}

export function deleteTopupMutation() {
  return useMutate<IResponse<null>, string>(deleteTopup);
}
