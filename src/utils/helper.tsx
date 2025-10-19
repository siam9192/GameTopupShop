import envConfig from '@/config/env.config';
import { Param } from '@/types/metadata.type';
import axios from 'axios';

export function simplifyRatio(width: number, height: number) {
  const gcd: any = (a: number, b: number) => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  return `${width / divisor}:${height / divisor}`;
}

export function getFormData(names: string[], e: HTMLFormElement) {
  const data = new FormData(e);
  const format: Record<string, string | undefined> = {};

  names.forEach(name => {
    const value = data.get(name);
    format[name] = value !== null ? String(value) : undefined;
  });

  return format;
}

export const getTimeAgo = (date: string): string => {
  const currentDate = new Date().getTime();
  const targetDate = new Date(date).getTime();
  const difference = currentDate - targetDate; // Time difference in milliseconds

  const minutes = 60 * 1000;
  const hours = 60 * minutes;
  const days = 24 * hours;

  if (difference >= days) {
    return `${Math.floor(difference / days)} days ago`;
  }
  if (difference >= hours) {
    return `${Math.floor(difference / hours)} hours ago`;
  }
  if (difference >= minutes) {
    return `${Math.floor(difference / minutes)} minutes ago`;
  }

  return `just now`;
};
export function paramsToString(params: Param[]) {
  if (!params.length) return '';

  const urlSearchParams = new URLSearchParams();
  params.forEach(({ name, value }) => {
    urlSearchParams.append(name, value.toString());
  });

  const str = urlSearchParams.toString();
  return str ? `?${str}` : '';
}

export const uploadImageToImgBB = async (file: File) => {
  const response = await axios.post(
    `${envConfig.img_bb_uploadUrl}?key=${envConfig.img_bb_key}` as string,
    { image: file },
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );

  const url = response.data.data.display_url;
  if (!url) throw new Error();
  return url;
};

