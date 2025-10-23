'use server';

import axiosInstance from '@/axios/axiosInstance';
import { Param } from '@/types/metadata.type';
import { MakeWalletAddBalanceLivePaymentPayload } from '@/types/transaction.type';
import { paramsToString } from '@/utils/helper';
import { AxiosError } from 'axios';

export async function getTransactions(params: Param[]) {
  try {
    const res = await axiosInstance.get(`/transactions${paramsToString(params)}`);

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

export async function getTransactionById(id: string) {
  try {
    const res = await axiosInstance.get(`/transactions/${id}`);

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

export async function makeWalletAddBalanceLivePaymentPayloadinde(
  payload: MakeWalletAddBalanceLivePaymentPayload,
) {
  try {
    const res = await axiosInstance.post(`/transactions/wallet-add-balance/live-payment/`, payload);

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
