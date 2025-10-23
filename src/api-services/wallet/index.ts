'use server';

import axiosInstance from '@/axios/axiosInstance';
import { Param } from '@/types/metadata.type';
import { UpdateWalletBalancePayload } from '@/types/wallet.type';
import { paramsToString } from '@/utils/helper';
import { AxiosError } from 'axios';

export async function getWallets(params: Param[]) {
  try {
    const res = await axiosInstance.get(`/wallets${paramsToString(params)}`);

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

export async function getWalletById(id: string) {
  try {
    const res = await axiosInstance.get(`/wallets/${id}`);

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

export async function updateWalletBalance(payload: UpdateWalletBalancePayload) {
  try {
    const res = await axiosInstance.patch(`/wallets/balance`, payload);
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
