'use client';

import CustomerDashboardHeader from '@/components/shared/CustomerDashboardHeader';
import CustomerDashboardSidebar from '@/components/shared/CustomerDashboardSidebar';
import Header from '@/components/shared/Header';
import Sidebar from '@/components/shared/Sidebar';
import { Stack } from '@mui/material';
import React, { createContext, Dispatch, SetStateAction, useState } from 'react';

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
  const [sidebarCollapse, setSidebarCollapse] = useState<boolean>(false);
  const value = {
    sidebarCollapse,
    setSidebarCollapse,
  };

  return (
    <>
      <div className="max-w-[2500px] mx-auto ">
        <CustomerDashboardLayoutContext.Provider value={value}>
          <Stack direction={'row'}>
            <div
              className={`h-screen  max-h-[1700px] lg:block hidden  sticky top-0 ${sidebarCollapse === false ? 'w-[300px]' : 'w-[100px] '}  duration-200 ease-in overflow-hidden`}
            >
              <CustomerDashboardSidebar />
            </div>
            <div className=" grow lg:min-w-[1000px] max-w-[1900px]  ">
              <CustomerDashboardHeader />
              <div className="p-5">{children}</div>
            </div>
          </Stack>
        </CustomerDashboardLayoutContext.Provider>
      </div>
    </>
  );
}

export default layout;
