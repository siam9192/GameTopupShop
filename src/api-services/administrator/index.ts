'use server';
import axiosInstance from '@/axios/axiosInstance';
import { Param } from '@/types/metadata.type';
import { AccountStatus, AdministratorLevel } from '@/types/user.type';
import { paramsToString } from '@/utils/helper';
import { AxiosError } from 'axios';

export async function getAdministrators(params: Param[]) {
  try {
    const res = await axiosInstance.get(`/administrators?${paramsToString(params)}`);

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

export async function getAdministratorById(id: string) {
  try {
    const res = await axiosInstance.get(`/administrators/${id}`);
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




export async function updateAdministratorLevel(payload:{id: string,level:AdministratorLevel}) {
  try {
    const res = await axiosInstance.patch(`/administrators/level`,payload);
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




export async function deleteAdministrator(id:string) {
  try {
    const res = await axiosInstance.delete(`/administrators/${id}`);
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



export async function updateAdministratorStatus(payload: { id: string; status: AccountStatus }) {
  try {
    const res = await axiosInstance.patch(`/administrators/status`, payload);
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
