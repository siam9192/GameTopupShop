'use server';

import axiosInstance from '@/axios/axiosInstance';
import {
  CreateManualPaymentMethodPayload,
  UpdateManualPaymentMethodPayload,
  UpdateManualPaymentMethodStatusPayload,
} from '@/types/manual-payment-method.type';
import { Param } from '@/types/metadata.type';
import {
  CreateOfferPayload,
  UpdateOfferPayload,
  UpdateOfferStatusPayload,
} from '@/types/offer.type';

import { paramsToString } from '@/utils/helper';
import { AxiosError } from 'axios';

export async function getManualPaymentMethods(params: Param[]) {
  try {
    const res = await axiosInstance.get(`/manual-payment-methods${paramsToString(params)}`);

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

export async function getManualPaymentMethodById(id: string) {
  try {
    const res = await axiosInstance.get(`/manual-payment-methods/${id}`);

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

export async function createManualPaymentMethod(payload: CreateManualPaymentMethodPayload) {
  try {
    const res = await axiosInstance.post(`/manual-payment-methods`, payload);

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

export async function updateManualPaymentMethod({
  id,
  payload,
}: {
  id: string;
  payload: UpdateManualPaymentMethodPayload;
}) {
  try {
    const res = await axiosInstance.put(`/manual-payment-methods/${id}`, payload);
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

export async function updateManualPaymentMethodStatus(
  payload: UpdateManualPaymentMethodStatusPayload,
) {
  try {
    const res = await axiosInstance.patch(`/manual-payment-methods/status`, payload);
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

export async function deleteManualPaymentMethod(id: string) {
  try {
    const res = await axiosInstance.delete(`/manual-payment-methods/${id}`);
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
