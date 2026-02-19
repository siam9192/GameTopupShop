import { getCurrencies } from '@/api-services/currency';
import useFetch from '@/query/client/useFetch';
import { Currency } from '@/types/currency.type';
import { IResponse } from '@/types/response.type';

export function getCurrenciesQuery() {
  return useFetch<IResponse<Currency>>(['getCurrencies'], () => getCurrencies());
}

// export function updateAppSettingsMutation() {
//   return useMutate<IResponse<AppSetting>, UpdateAppSettingPayload>(updateAppSettings);
// }
