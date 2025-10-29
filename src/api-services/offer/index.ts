'use server';

import axiosInstance from '@/axios/axiosInstance';
import { Param } from '@/types/metadata.type';
import {
  CreateOfferPayload,
  UpdateOfferPayload,
  UpdateOfferStatusPayload,
} from '@/types/offer.type';

import { paramsToString } from '@/utils/helper';
import { AxiosError } from 'axios';

export async function getOffers(params: Param[]) {
  try {
    const res = await axiosInstance.get(`/offers${paramsToString(params)}`);

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



export async function getPublicOffers(params: Param[]) {
  try {
    const res = await axiosInstance.get(`/offers${paramsToString(params)}`);

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


export async function getEndingSoonOffers(params: Param[]) {
  try {
    const res = await axiosInstance.get(`/offers/ending-soon${paramsToString(params)}`);

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

export async function getOfferById(id: string) {
  try {
    const res = await axiosInstance.get(`/offers/${id}`);

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

export async function createOffer(payload: CreateOfferPayload) {
  try {
    const res = await axiosInstance.post(`/offers`, payload);

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

export async function updateOffer({ id, payload }: { id: string; payload: UpdateOfferPayload }) {
  try {
    const res = await axiosInstance.put(`/offers/${id}`, payload);
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

export async function updateOfferStatus(payload: UpdateOfferStatusPayload) {
  try {
    const res = await axiosInstance.patch(`/offers/status`, payload);
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

export async function deleteOffer(id: string) {
  try {
    const res = await axiosInstance.delete(`/offers/${id}`);
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
