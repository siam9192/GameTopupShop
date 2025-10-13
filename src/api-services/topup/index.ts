'use server';

import axiosInstance from '@/axios/axiosInstance';
import { Param } from '@/types/metadata.type';
import {
  CreateTopupPayload,
  TopupStatus,
  UpdateTopupPayload,
  UpdateTopupStatusPayload,
} from '@/types/topup.type';
import { paramsToString } from '@/utils/helper';
import { AxiosError } from 'axios';

export async function getTopups(params: Param[]) {
  try {
    const res = await axiosInstance.get(`/topups?${paramsToString(params)}`);

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

export async function getTopupById(id: string) {
  try {
    const res = await axiosInstance.get(`/topups/${id}`);

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

export async function createTopup(payload: CreateTopupPayload) {
  try {
    const res = await axiosInstance.post(`/topups`, payload);

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

export async function updateTopup({ id, payload }: { id: string; payload: UpdateTopupPayload }) {
  try {
    const res = await axiosInstance.put(`/topups/${id}`, payload);
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

export async function updateTopupStatus(payload: UpdateTopupStatusPayload) {
  try {
    const res = await axiosInstance.patch(`/topups/status`, payload);
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

export async function deleteTopup(id: string) {
  try {
    const res = await axiosInstance.delete(`/topups/${id}`);
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
