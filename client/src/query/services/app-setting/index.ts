import { getAppSettings, updateAppSettings } from '@/api-services/app-setting';
import useFetch from '@/query/client/useFetch';
import useMutate from '@/query/client/useMutation';
import { AppSetting, UpdateAppSettingPayload } from '@/types/app-setting.type';
import { IResponse } from '@/types/response.type';

export function getAppSettingsQuery() {
  return useFetch<IResponse<AppSetting>>(['getAppSettings'], () => getAppSettings());
}

export function updateAppSettingsMutation() {
  return useMutate<IResponse<AppSetting>, UpdateAppSettingPayload>(updateAppSettings);
}
