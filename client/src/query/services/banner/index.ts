import {
  createBanner,
  deleteBanner,
  getBannerById,
  getBanners,
  getPublicBanners,
  updateBanner,
} from '@/api-services/banner';
import useFetch from '@/query/client/useFetch';
import useMutate from '@/query/client/useMutation';
import { Banner, CreateBannerPayload, UpdateBannerPayload } from '@/types/banner.type';
import { Param } from '@/types/metadata.type';
import { IResponse } from '@/types/response.type';

export function createBannerMutation() {
  return useMutate<IResponse<Banner>, CreateBannerPayload>(createBanner);
}

export function getBannersQuery(params: Param[]) {
  return useFetch<IResponse<Banner[]>>(['getBanners'], () => getBanners(params));
}

export function getPublicBannersQuery(params: Param[]) {
  return useFetch<IResponse<Banner[]>>(['getPublicBanners'], () => getPublicBanners(params));
}

export function getBannerByIdQuery(id: string) {
  return useFetch<IResponse<Banner>>(['getBannerById', id], () => getBannerById(id));
}

export function updateBannerMutation() {
  return useMutate<
    IResponse<Banner[]>, // Success type
    { id: string; payload: UpdateBannerPayload }, // Variables
    Error // Error type
  >(({ id, payload }) => updateBanner(id, payload));
}

export function deleteBannerMutation() {
  return useMutate<IResponse<null>, string>(deleteBanner);
}
