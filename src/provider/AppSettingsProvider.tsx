import { createContext, useContext, ReactNode } from 'react';
import { AppSetting } from '@/types/app-setting.type';
import { IResponse } from '@/types/response.type';
import { UseQueryResult } from '@tanstack/react-query';
import { getAppSettingsQuery } from '@/query/services/app-setting';
import { CURRENCIES } from '@/utils/constant';
import { Currency } from '@/types/currency.type';

export type AppSettingsProviderContextType = {
  queryResult: UseQueryResult<IResponse<AppSetting>, unknown>;
  settings?: AppSetting;
  currency:Currency
};

const AppSettingsProviderContext = createContext<AppSettingsProviderContextType | undefined>(
  undefined,
);

export function useAppSettings() {
  const context = useContext(AppSettingsProviderContext);
  if (!context) {
    throw new Error('useCurrentUser must be used within a  AppSettingsProvider');
  }
  return context;
}

function AppSettingsProvider({ children }: { children: ReactNode }) {
  const result = getAppSettingsQuery();
  const settingCurrencyCode =  result.data?.data.currency
  const  currency:Currency  =  (settingCurrencyCode ? CURRENCIES.find(cur=>cur.code ===  settingCurrencyCode) : CURRENCIES[0]) as Currency
  
  return (
    <AppSettingsProviderContext.Provider
      value={{ queryResult: result, settings: result.data?.data,currency }}
    >
      {children}
    </AppSettingsProviderContext.Provider>
  );
}

export default AppSettingsProvider;
