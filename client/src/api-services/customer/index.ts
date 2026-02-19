'use server';
import axiosInstance from '@/axios/axiosInstance';
import { Param } from '@/types/metadata.type';
import { AccountStatus } from '@/types/user.type';
import { paramsToString } from '@/utils/helper';
import { AxiosError } from 'axios';

export async function getCustomers(params: Param[]) {
  try {
    const res = await axiosInstance.get(`/customers${paramsToString(params)}`);
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

export async function getCustomerById(id: string) {
  try {
    const res = await axiosInstance.get(`/customers/${id}`);
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

export async function updateCustomerStatus(payload: { id: string; status: AccountStatus }) {
  try {
    const res = await axiosInstance.patch(`/customers/status`, payload);
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

export async function deleteCustomer(id: string) {
  try {
    const res = await axiosInstance.delete(`/customers/${id}`);
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
