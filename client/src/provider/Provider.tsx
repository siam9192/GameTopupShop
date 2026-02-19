'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CurrentUserProvider from './CurrentUserProvider';
import AppSettingsProvider from './AppSettingsProvider';
import AppStatusChecker from '@/components/ui/AppStatusChecker';
type TProvider = {
  children: React.ReactNode;
};
export const queryClient = new QueryClient();
export default function Provider({ children }: TProvider) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <AppSettingsProvider>
          <AppStatusChecker>
            <CurrentUserProvider>
              {children}
              <ToastContainer position="bottom-right" theme="dark" />
            </CurrentUserProvider>
          </AppStatusChecker>
        </AppSettingsProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
