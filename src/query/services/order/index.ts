import { updateOffer } from '@/api-services/offer';
import { createOrder, getOrderById, getOrders, updateOrderStatus } from '@/api-services/order';
import useFetch from '@/query/client/useFetch';
import useMutate from '@/query/client/useMutation';
import { Param } from '@/types/metadata.type';
import { UpdateOfferPayload } from '@/types/offer.type';
import { CreateOrderPayload, Order, UpdateOrderStatusPayload } from '@/types/order.type';
import { IResponse } from '@/types/response.type';

export function getOrdersQuery(params: Param[]) {
  return useFetch<IResponse<Order[]>>(['getOrders'], () => getOrders(params));
}

export function getOrderByIdQuery(id: string) {
  return useFetch<IResponse<Order>>(['getOrderById', id], () => getOrderById(id));
}

export function updateOrderStatusMutation() {
  return useMutate<IResponse<Order>, UpdateOrderStatusPayload>(updateOrderStatus);
}

export function createOrderMutation() {
  return useMutate<IResponse<Order>, CreateOrderPayload>(createOrder);
}

export function updateOrderMutation() {
  return useMutate<IResponse<null>, { id: string; payload: UpdateOfferPayload }>(updateOffer);
}
