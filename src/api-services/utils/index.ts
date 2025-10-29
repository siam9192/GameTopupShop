'use server';

import axiosInstance from '@/axios/axiosInstance';
import { Param } from '@/types/metadata.type';

import { paramsToString } from '@/utils/helper';
import { AxiosError } from 'axios';

export async function getSearchProducts(params: Param[]) {
  try {
    const res = await axiosInstance.get(`/utils/search-products${paramsToString(params)}`);

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
