'use server';
import axiosInstance from '@/axios/axiosInstance';
import { Param } from '@/types/metadata.type';
import { UpdateOfferPayload } from '@/types/offer.type';
import { CreateOrderPayload, UpdateOrderStatusPayload } from '@/types/order.type';

import { paramsToString } from '@/utils/helper';
import { AxiosError } from 'axios';

export async function getOrders(params: Param[]) {
  try {
    const res = await axiosInstance.get(`/orders${paramsToString(params)}`);

    return res.data;
  } catch (err: unknown) {
    let message = 'Something went wrong';

    if (err instanceof AxiosError) {
      message = err.response?.data?.message || err.message || message;
    } else if (err instanceof Error) {
      message = err.message;
    }

    throw new Error(message);
  }
}

export async function getMyOrders(params: Param[]) {
  try {
    const res = await axiosInstance.get(`/orders/my${paramsToString(params)}`);

    return res.data;
  } catch (err: unknown) {
    let message = 'Something went wrong';

    if (err instanceof AxiosError) {
      message = err.response?.data?.message || err.message || message;
    } else if (err instanceof Error) {
      message = err.message;
    }

    throw new Error(message);
  }
}

export async function getOrderById(id: string) {
  try {
    const res = await axiosInstance.get(`/orders/${id}`);

    return res.data;
  } catch (err: unknown) {
    let message = 'Something went wrong';

    if (err instanceof AxiosError) {
      message = err.response?.data?.message || err.message || message;
    } else if (err instanceof Error) {
      message = err.message;
    }

    throw new Error(message);
  }
}

export async function getRecentOrders(recentDate: string, params?: Param[]) {
  try {
    const res = await axiosInstance.get(
      `/orders/recent/${recentDate}${paramsToString(params || [])}`,
    );

    return res.data;
  } catch (err: unknown) {
    let message = 'Something went wrong';

    if (err instanceof AxiosError) {
      message = err.response?.data?.message || err.message || message;
    } else if (err instanceof Error) {
      message = err.message;
    }

    throw new Error(message);
  }
}

export async function getMyRecentOrders(recentDate: string, params?: Param[]) {
  try {
    const res = await axiosInstance.get(
      `/orders/my/recent/${recentDate}${paramsToString(params || [])}`,
    );

    return res.data;
  } catch (err: unknown) {
    let message = 'Something went wrong';

    if (err instanceof AxiosError) {
      message = err.response?.data?.message || err.message || message;
    } else if (err instanceof Error) {
      message = err.message;
    }

    throw new Error(message);
  }
}

export async function createOrder(payload: CreateOrderPayload) {
  try {
    const res = await axiosInstance.post(`/orders`, payload);

    return res.data;
  } catch (err: unknown) {
    let message = 'Something went wrong';

    if (err instanceof AxiosError) {
      message = err.response?.data?.message || err.message || message;
    } else if (err instanceof Error) {
      message = err.message;
    }

    throw new Error(message);
  }
}

export async function updateOffer({ id, payload }: { id: string; payload: UpdateOfferPayload }) {
  try {
    const res = await axiosInstance.put(`/offers/${id}`, payload);
    return res.data;
  } catch (err: unknown) {
    let message = 'Something went wrong';
    if (err instanceof AxiosError) {
      message = err.response?.data?.message || err.message || message;
    } else if (err instanceof Error) {
      message = err.message;
    }

    throw new Error(message);
  }
}

export async function updateOrderStatus(payload: UpdateOrderStatusPayload) {
  try {
    const res = await axiosInstance.patch(`/orders/status`, payload);
    return res.data;
  } catch (err: unknown) {
    let message = 'Something went wrong';
    if (err instanceof AxiosError) {
      message = err.response?.data?.message || err.message || message;
    } else if (err instanceof Error) {
      message = err.message;
    }

    throw new Error(message);
  }
}
