'use server';
import axiosInstance from '@/axios/axiosInstance';
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
    console.log('This is error', err);
    const error = err as AxiosError<{ message?: string }>;

    // Custom error message (backend message OR fallback)
    const message = error.response?.data?.message || error.message || 'Something went wrong';

    // Re-throw clean error
    throw new Error(message);
  }
}

export async function customerSignin(payload: SigninPayload) {
  try {
    const res = await axiosInstance.post('/auth/signin', payload);

    return res.data; // return only the useful data
  } catch (err) {
    console.log('This is error', err);
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

