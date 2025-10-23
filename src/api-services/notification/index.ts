'use server';
import axiosInstance from '@/axios/axiosInstance';
import { Param } from '@/types/metadata.type';
import { NotificationSetAsReadPayload } from '@/types/notification.type';
import { paramsToString } from '@/utils/helper';
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

export async function getMyUnreadNotifications(params: Param[]) {
  try {
    const res = await axiosInstance.get(`/notifications/my/unread${paramsToString(params)}`);

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


export async function notificationSetAsRead(payload:NotificationSetAsReadPayload) {
  try {
    const res = await axiosInstance.patch(`/notifications/set-read`,payload);

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

