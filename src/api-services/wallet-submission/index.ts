'use server';

import axiosInstance from '@/axios/axiosInstance';
import { Param } from '@/types/metadata.type';
import {
  CreateWalletSubmissionPayload,
  DeclineWalletSubmissionPayload,
} from '@/types/wallet-submission.type';

import { paramsToString } from '@/utils/helper';
import { AxiosError } from 'axios';

export async function getWalletSubmissions(params: Param[]) {
  try {
    const res = await axiosInstance.get(`/wallet-submissions${paramsToString(params)}`);

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

export async function getMyWalletSubmissions(params: Param[]) {
  try {
    const res = await axiosInstance.get(`/wallet-submissions/my${paramsToString(params)}`);

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

export async function getMyWalletSubmissionById(id: string) {
  try {
    const res = await axiosInstance.get(`/wallet-submissions/my/${id}`);

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

export async function getWalletSubmissionById(id: string) {
  try {
    const res = await axiosInstance.get(`/wallet-submissions/${id}`);

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

export async function approveWalletSubmission(id: string) {
  try {
    const res = await axiosInstance.patch(`/wallet-submissions/${id}/approve`);
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

export async function declineWalletSubmission({
  id,
  payload,
}: {
  id: string;
  payload: DeclineWalletSubmissionPayload;
}) {
  try {
    const res = await axiosInstance.patch(`/wallet-submissions/${id}/decline`, payload);
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

export async function cancelWalletSubmission(id: string) {
  try {
    const res = await axiosInstance.patch(`/wallet-submissions/${id}/cancel`);
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

export async function createWalletSubmission(payload: CreateWalletSubmissionPayload) {
  try {
    const res = await axiosInstance.post(`/wallet-submissions`, payload);
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

export async function getMyRecentWalletSubmissions(params: Param[]) {
  try {
    const res = await axiosInstance.get(`/wallet-submissions/my/recent${paramsToString(params)}`);
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
