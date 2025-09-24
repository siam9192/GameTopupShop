'use client';

import ControlDashboardHeader from '@/components/shared/ControlDashboardHeader';
import ControlDashboardSidebar from '@/components/shared/ControlDashboardSidebar';
import CustomerDashboardHeader from '@/components/shared/CustomerDashboardHeader';
import { Stack } from '@mui/material';
import React, { createContext, Dispatch, SetStateAction, useState } from 'react';

export type TControlDashboardLayoutContextValue = {
  sidebarCollapse: boolean;
  setSidebarCollapse: Dispatch<SetStateAction<boolean>>;
};
export const ControlDashboardLayoutContext =
  createContext<TControlDashboardLayoutContextValue | null>(null);

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
        <ControlDashboardLayoutContext.Provider value={value}>
          <Stack direction={'row'}>
            <div
              className={`h-screen  max-h-[1700px] lg:block hidden  sticky top-0 ${sidebarCollapse === false ? 'w-[300px]' : 'w-[100px] '}  duration-200 ease-in overflow-hidden`}
            >
              <ControlDashboardSidebar />
            </div>
            <div className=" flex-1 lg:min-w-[1000px] max-w-[1900px]  ">
              <ControlDashboardHeader />
              <div className="p-5">{children}</div>
            </div>
          </Stack>
        </ControlDashboardLayoutContext.Provider>
      </div>
    </>
  );
}

export default layout;
