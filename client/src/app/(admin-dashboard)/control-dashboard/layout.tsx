'use client';

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { usePathname } from 'next/navigation';

import ControlDashboardHeader from '@/components/shared/ControlDashboardHeader';
import ControlDashboardSidebar from '@/components/shared/ControlDashboardSidebar';
import UserLoading from '@/components/ui/UserLoading';

export type TControlDashboardLayoutContextValue = {
  sidebarCollapse: boolean;
  setSidebarCollapse: Dispatch<SetStateAction<boolean>>;
};

const ControlDashboardLayoutContext =
  createContext<TControlDashboardLayoutContextValue | null>(null);

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapse, setSidebarCollapse] = useState(false);
  const pathname = usePathname();

  // Memoize the context value to avoid re-renders
  const value = useMemo(
    () => ({ sidebarCollapse, setSidebarCollapse }),
    [sidebarCollapse]
  );

  // Change page title
  useEffect(() => {
    document.title = 'Control Dashboard';
  }, []);

  // Auto-close sidebar on route change (mobile experience)
  useEffect(() => {
    setSidebarCollapse(false);
  }, [pathname]);

  return (
    <UserLoading>
      <ControlDashboardLayoutContext.Provider value={value}>
        <div className="max-w-[2500px] mx-auto">
          <div className="flex h-screen overflow-hidden">

            {/* Sidebar */}
            <aside
              className={`
                sticky top-0 h-screen bg-base-200 shadow-lg
                transition-all duration-300 ease-in-out
                ${sidebarCollapse ? 'w-[300px]' : 'w-0 lg:w-[300px]'}
                overflow-hidden
              `}
            >
              <ControlDashboardSidebar />
            </aside>

            {/* Main Area */}
            <main className="flex-1  flex flex-col overflow-y-auto overflow-x-hidden">
              <ControlDashboardHeader />
              <div className="p-5">{children}</div>
            </main>
          </div>
        </div>
      </ControlDashboardLayoutContext.Provider>
    </UserLoading>
  );
}

// Custom hook for accessing layout context
export function useControlDashboardLayoutContext() {
  const context = useContext(ControlDashboardLayoutContext);
  if (!context) {
    throw new Error('useControlDashboardLayoutContext must be used inside Layout');
  }
  return context;
}
