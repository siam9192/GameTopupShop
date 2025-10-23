'use client';

import CustomerDashboardHeader from '@/components/shared/CustomerDashboardHeader';
import CustomerDashboardSidebar from '@/components/shared/CustomerDashboardSidebar';
import UserLoading from '@/components/ui/UserLoading';
import { useMediaQuery, useTheme } from '@mui/material';

import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { useWindowSize } from 'react-use';
export type TCustomerDashboardLayoutContextValue = {
  sidebarCollapse: boolean;
  setSidebarCollapse: Dispatch<SetStateAction<boolean>>;
};
export const CustomerDashboardLayoutContext =
  createContext<TCustomerDashboardLayoutContextValue | null>(null);

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { width } = useWindowSize();
  const [sidebarCollapse, setSidebarCollapse] = useState<boolean>(false);
  const value = {
    sidebarCollapse,
    setSidebarCollapse,
  };
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const sidebarWidth = (100 / width) * 80;

  return (
    <>
      <UserLoading>
        <CustomerDashboardLayoutContext.Provider value={value}>
          <div className="overflow-hidden">
            <div className={`flex h-screen ${sidebarCollapse ? 'w-[2000px]' : ''}  `}>
              {/* Sidebar */}
              <div
                className={`
          sticky top-0 h-full bg-white border-r transition-all duration-200 
          ${sidebarCollapse ? 'w-[300px]' : ' w-0 lg:w-[300px]'}
          overflow-hidden
        `}
              >
                <CustomerDashboardSidebar />
              </div>

              {/* Main Content */}
              <div className={` flex-1 flex flex-col transition-all duration-200`}>
                <CustomerDashboardHeader />
                <div className="overflow-y-auto p-5">{children}</div>
              </div>
            </div>
          </div>
        </CustomerDashboardLayoutContext.Provider>
      </UserLoading>
    </>
  );
}

export default layout;

export function useCustomerDashboardLayoutContext() {
  const context = useContext(CustomerDashboardLayoutContext);
  if (!context) throw new Error('Must be under at CustomerDashboardLayout');
  return context;
}
