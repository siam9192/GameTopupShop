'use server';
import axiosInstance from '@/axios/axiosInstance';
import { CreateBannerPayload, UpdateBannerPayload } from '@/types/banner.type';
import { Param } from '@/types/metadata.type';
import { paramsToString } from '@/utils/helper';
import { AxiosError } from 'axios';

export async function createBanner(payload: CreateBannerPayload) {
  try {
    const res = await axiosInstance.post('/banners', payload);

    return res.data; // return only the useful data
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    // Custom error message (backend message OR fallback)
    const message = error.response?.data?.message || error.message || 'Something went wrong';

    // Re-throw clean error
    throw new Error(message);
  }
}

export async function getBanners(params: Param[]) {
  try {
    const res = await axiosInstance.get(`/banners${paramsToString(params)}`);

    return res.data; // return only the useful data
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    // Custom error message (backend message OR fallback)
    const message = error.response?.data?.message || error.message || 'Something went wrong';

    // Re-throw clean error
    throw new Error(message);
  }
}

export async function getPublicBanners(params: Param[]) {
  try {
    const res = await axiosInstance.get(`/banners/public${paramsToString(params)}`);

    return res.data; // return only the useful data
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    // Custom error message (backend message OR fallback)
    const message = error.response?.data?.message || error.message || 'Something went wrong';

    // Re-throw clean error
    throw new Error(message);
  }
}

export async function getBannerById(id: string) {
  try {
    const res = await axiosInstance.get(`/banners/${id}`);

    return res.data; // return only the useful data
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    // Custom error message (backend message OR fallback)
    const message = error.response?.data?.message || error.message || 'Something went wrong';

    // Re-throw clean error
    throw new Error(message);
  }
}

export async function updateBanner(id: string, payload: UpdateBannerPayload) {
  try {
    const res = await axiosInstance.put(`/banners/${id}`, payload);

    return res.data; // return only the useful data
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    // Custom error message (backend message OR fallback)
    const message = error.response?.data?.message || error.message || 'Something went wrong';

    // Re-throw clean error
    throw new Error(message);
  }
}

export async function deleteBanner(id: string) {
  try {
    const res = await axiosInstance.delete(`/banners/${id}`);

    return res.data; // return only the useful data
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    // Custom error message (backend message OR fallback)
    const message = error.response?.data?.message || error.message || 'Something went wrong';

    // Re-throw clean error
    throw new Error(message);
  }
}
