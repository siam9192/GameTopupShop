'use client';

import Header from '@/components/shared/Header';
import Sidebar from '@/components/shared/Sidebar';
import { Stack } from '@mui/material';
import React, { createContext, Dispatch, SetStateAction, useState } from 'react';

export type TCommonLayoutContextValue = {
  sidebarCollapse: boolean;
  setSidebarCollapse: Dispatch<SetStateAction<boolean>>;
};
export const CommonLayoutContext = createContext<TCommonLayoutContextValue | null>(null);

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
        <CommonLayoutContext.Provider value={value}>
          <Stack direction={'row'}>
            <div
              className={`h-screen  max-h-[1700px] lg:block hidden  sticky top-0 p-2  ${sidebarCollapse === false ? 'w-[300px]' : 'w-[100px] '}  duration-200 ease-in overflow-hidden`}
            >
              <Sidebar />
            </div>
            <div className=" grow lg:min-w-[1000px] max-w-[1600px] lg:px-2  ">
              <Header />
              <div className="p-2">{children}</div>
            </div>
          </Stack>
        </CommonLayoutContext.Provider>
      </div>
    </>
  );
}

export default layout;
