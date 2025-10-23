'use server';
import axiosInstance from '@/axios/axiosInstance';
import { ChangePasswordPayload } from '@/server/utils/auth.type';
import { IResponse } from '@/types/response.type';
import { AxiosError } from 'axios';
import { cookies } from 'next/headers';

export interface CustomerSignupPayload {
  name: {
    first: string;
    last: string;
  };
  email: string;
  password: string;
}

export interface SigninPayload {
  email: string;
  password: string;
}

export async function customerSignup(payload: CustomerSignupPayload) {
  try {
    const res = await axiosInstance.post('/auth/signup', payload);

    return res.data; // return only the useful data
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    // Custom error message (backend message OR fallback)
    const message = error.response?.data?.message || error.message || 'Something went wrong';

    // Re-throw clean error
    throw new Error(message);
  }
}

export async function customerSignin(payload: SigninPayload) {
  try {
    const res = await axiosInstance.post<IResponse<{ accessToken: string; refreshToken: string }>>(
      '/auth/signin',
      payload,
    );
    const data = res.data;
    await setAuthTokens(data.data.accessToken, data.data.refreshToken);
    return data; // return only the useful data
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    // Custom error message (backend message OR fallback)
    const message = error.response?.data?.message || error.message || 'Something went wrong';

    // Re-throw clean error
    throw new Error(message);
  }
}

export async function administratorSignin(payload: SigninPayload) {
  try {
    const res = await axiosInstance.post<IResponse<{ accessToken: string; refreshToken: string }>>(
      '/auth/administrator-signin',
      payload,
    );
    const data = res.data;
    await setAuthTokens(data.data.accessToken, data.data.refreshToken);
    return data; // return only the useful data
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    // Custom error message (backend message OR fallback)
    const message = error.response?.data?.message || error.message || 'Something went wrong';

    // Re-throw clean error
    throw new Error(message);
  }
}

export async function changePassword(payload: ChangePasswordPayload) {
  try {
    const res = await axiosInstance.patch('/auth/change-password', payload);

    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    // Custom error message (backend message OR fallback)
    const message = error.response?.data?.message || error.message || 'Something went wrong';

    // Re-throw clean error
    throw new Error(message);
  }
}

export async function setAuthTokens(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'accessToken',
    value: accessToken,
    httpOnly: true,
    path: '/',
    maxAge: 10 * 365 * 24 * 60 * 60,
  });
  cookieStore.set({
    name: 'refreshToken',
    value: refreshToken,
    httpOnly: true,
    path: '/',
    maxAge: 10 * 365 * 24 * 60 * 60,
  });
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
}
