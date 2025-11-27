'use client';

import ControlDashboardHeader from '@/components/shared/ControlDashboardHeader';
import ControlDashboardSidebar from '@/components/shared/ControlDashboardSidebar';
import UserLoading from '@/components/ui/UserLoading';
import { usePathname } from 'next/navigation';
import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

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
  useEffect(() => {
    document.title = 'Control Dashboard';
  }, []);

  const pathname = usePathname();
  useEffect(() => {
    setSidebarCollapse(false);
  }, [pathname]);

  return (
     <UserLoading>
    <div className="max-w-[2500px] mx-auto overflow-hidden">
    <ControlDashboardLayoutContext.Provider value={value}>
       
  
         <div className={`flex h-screen ${sidebarCollapse ? 'w-[2000px]' : ''}  `}>
            {/* Sidebar */}
            <div
              className={`
            sticky top-0 h-screen
            transition-all duration-200
            ${sidebarCollapse ? 'w-[300px]' : 'w-0 lg:w-[300px]'}
           overflow-hidden`}
            >
              <ControlDashboardSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col transition-all duration-200 overflow-y-auto">
              <ControlDashboardHeader />
              <div className="p-5">{children}</div>
            </div>
          </div>
     
    
   
    </ControlDashboardLayoutContext.Provider>
    </div>
    </UserLoading>
  );
}

export default layout;



export function useControlDashboardLayoutContext() {
  const context = useContext(ControlDashboardLayoutContext);
  if (!context) throw new Error('Must be under at ControlDashboardLayout');
  return context;
}
