'use client';
import AdministratorsFilterBox from '@/components/sections/control-dashboard/AdministratorsFilterBox';
import AdministratorsFilterBoxModal from '@/components/sections/control-dashboard/AdministratorsFilterBoxModel';
import AdministratorsTable from '@/components/sections/control-dashboard/AdministratorsTable';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import React, { createContext, Dispatch, useContext, useState } from 'react';

type AdministratorPageContextType = {
  filters: Record<string, string>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

export const AdministratorsPageContext = createContext<AdministratorPageContextType | null>(null);
function page() {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const value: AdministratorPageContextType = {
    filters,
    setFilters,
  };
  return (
    <AdministratorsPageContext.Provider value={value}>
      <div>
        <DashboardPageHeading title="Administrators" />
        <AdministratorsFilterBox />
        <div className="flex justify-end">
          <AdministratorsFilterBoxModal />
        </div>
        <AdministratorsTable />
      </div>
    </AdministratorsPageContext.Provider>
  );
}

export default page;

export function useAdministratorsPageContext() {
  const context = useContext(AdministratorsPageContext);
  if (!context) {
    throw new Error('useCurrentUser must be used within a Provider');
  }
  return context;
}
