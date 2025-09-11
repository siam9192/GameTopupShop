'use server';
import envConfig from '@/config/env.config';
import axios from 'axios';
import { cookies } from 'next/headers';

const axiosInstance = axios.create({
  baseURL: envConfig.backendBaseUrl,
});
axiosInstance.interceptors.request.use(async function (config) {
  const accessToken = (await cookies()).get('accessToken')?.value;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// axiosInstance.interceptors.response.use(
//   function (response) {

//     return response;
//   },
//   async function (error) {
//     const config = error.config;

//   },
// );

export default axiosInstance;
