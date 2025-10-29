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
      <div className="max-w-[2500px] mx-auto overflow-hidden">
        <CommonLayoutContext.Provider value={value}>
          <div className={`flex h-screen ${sidebarCollapse ? 'w-[2000px]' : ''}  `}>
            {/* Sidebar */}
            <div
              className={`
            sticky top-0 h-screen border-r bg-white dark:bg-gray-900
            transition-all duration-200
            ${sidebarCollapse ? 'w-[300px]' : 'w-0 lg:w-[300px]'}
           overflow-hidden`}
            >
              <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col transition-all duration-200 overflow-y-auto">
              <Header />
              <div className="p-5">{children}</div>
            </div>
          </div>
        </CommonLayoutContext.Provider>
      </div>
    </>
  );
}

export default layout;
