import {
  createOffer,
  deleteOffer,
  getOfferById,
  getOffers,
  getPublicOffers,
  updateOffer,
  updateOfferStatus,
} from '@/api-services/offer';
import useFetch from '@/query/client/useFetch';
import useMutate from '@/query/client/useMutation';
import { Param } from '@/types/metadata.type';
import {
  CreateOfferPayload,
  Offer,
  UpdateOfferPayload,
  UpdateOfferStatusPayload,
} from '@/types/offer.type';
import { IResponse } from '@/types/response.type';

export function getOffersQuery(params: Param[]) {
  return useFetch<IResponse<Offer[]>>(['getOffers'], () => getOffers(params));
}


export function getPublicOffersQuery(params: Param[]) {
  return useFetch<IResponse<Offer[]>>(['getPublicOffers'], () => getPublicOffers(params));
}


export function getOfferByIdQuery(id: string) {
  return useFetch<IResponse<Offer>>(['getOfferById', id], () => getOfferById(id));
}

export function updateOfferStatusMutation() {
  return useMutate<IResponse<Offer>, UpdateOfferStatusPayload>(updateOfferStatus);
}

export function createOfferMutation() {
  return useMutate<IResponse<Offer>, CreateOfferPayload>(createOffer);
}

export function updateOfferMutation() {
  return useMutate<IResponse<null>, { id: string; payload: UpdateOfferPayload }>(updateOffer);
}

export function deleteOfferMutation() {
  return useMutate<IResponse<null>, string>(deleteOffer);
}
