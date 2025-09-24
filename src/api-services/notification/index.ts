'use server';
import axiosInstance from '@/axios/axiosInstance';
import { AxiosError } from 'axios';

export async function getCurrentUserNotifications() {
  try {
    const res = await axiosInstance.get('/notifications/my');

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

export async function getCurrentUserNotificationCounts() {
  try {
    const res = await axiosInstance.get('/notifications/my/count');

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
