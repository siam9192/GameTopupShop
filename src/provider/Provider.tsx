'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CurrentUserProvider from './CurrentUserProvider';
type TProvider = {
  children: React.ReactNode;
};
export const queryClient = new QueryClient();
export default function Provider({ children }: TProvider) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <CurrentUserProvider>
          {children}
          <ToastContainer position="bottom-right" theme="dark" />
        </CurrentUserProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
