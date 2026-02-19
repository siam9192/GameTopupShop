'use server';
import axiosInstance from '@/axios/axiosInstance';
import { UpdateAppSettingPayload } from '@/types/app-setting.type';
import { AxiosError } from 'axios';

export async function getAppSettings() {
  try {
    const res = await axiosInstance.get(`/app-settings`);

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

export async function updateAppSettings(payload: UpdateAppSettingPayload) {
  try {
    const res = await axiosInstance.put(`/app-settings`, payload);
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
