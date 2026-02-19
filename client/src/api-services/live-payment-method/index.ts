'use server';
import axiosInstance from '@/axios/axiosInstance';
import { UpdateLivePaymentMethodStatus } from '@/types/live-payment-method.type';
import { Param } from '@/types/metadata.type';
import { paramsToString } from '@/utils/helper';
import { AxiosError } from 'axios';

export async function getLivePaymentMethods(params: Param[]) {
  try {
    const res = await axiosInstance.get(`/live-payment-methods${paramsToString(params)}`);

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

export async function getPublicLivePaymentMethods(params: Param[]) {
  try {
    const res = await axiosInstance.get(`/live-payment-methods/public${paramsToString(params)}`);

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

export async function getPublicLivePaymentMethodById(id: string) {
  try {
    const res = await axiosInstance.get(`/live-payment-methods/public/${id}`);

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

export async function getLivePaymentMethodById(id: string) {
  try {
    const res = await axiosInstance.get(`/live-payment-methods/${id}`);

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

export async function updateLivePaymentMethodStatus(payload: UpdateLivePaymentMethodStatus) {
  try {
    const res = await axiosInstance.patch(`/live-payment-methods/status`, payload);
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
