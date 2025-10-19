'use server';
import axiosInstance from '@/axios/axiosInstance';
import { UpdateAdministratorProfilePayload } from '@/types/administrator.type';
import { UpdateCustomerProfilePayload } from '@/types/customer.type';
import { AxiosError } from 'axios';
import { cookies } from 'next/headers';

export async function getCurrentUser() {
  try {
    const cookie = await cookies();
    const accessToken = cookie.get('accessToken')?.value;
    const refreshToken = cookie.get('refreshToken')?.value;

    if (!accessToken || !refreshToken) {
      throw new Error('User not authenticated');
    }

    const res = await axiosInstance.get('/users/current');

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

export async function getRecentUsers() {
  try {
    const res = await axiosInstance.get('/users/recent');

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

export async function updateUserProfile(
  payload: UpdateCustomerProfilePayload | UpdateAdministratorProfilePayload,
) {
  try {
    const res = await axiosInstance.put(`/users`, payload);

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
