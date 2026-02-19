'use server';
import axiosInstance from '@/axios/axiosInstance';
import { AxiosError } from 'axios';

export async function getCurrencies() {
  try {
    const res = await axiosInstance.get(`/currencies`);

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
