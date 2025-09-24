'use client';
import CustomersFilterBox from '@/components/sections/control-dashboard/CustomersFilterBox';
import CustomersFilterBoxModal from '@/components/sections/control-dashboard/CustomersFilterBoxModal';
import CustomersTable from '@/components/sections/control-dashboard/CustomersTable';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import React, { createContext, useContext, useState } from 'react';

type CustomersPageContextType = {
  filters: Record<string, string>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

export const CustomerPageContext = createContext<CustomersPageContextType | null>(null);

function page() {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const value: CustomersPageContextType = {
    filters,
    setFilters,
  };
  return (
    <CustomerPageContext.Provider value={value}>
      <div>
        <DashboardPageHeading title="Customers" />
        <CustomersFilterBox />
        <div className="flex justify-end">
          <CustomersFilterBoxModal />
        </div>
        <CustomersTable />
      </div>
    </CustomerPageContext.Provider>
  );
}

export default page;

export function useCustomersPageContext() {
  const context = useContext(CustomerPageContext);
  if (!context) {
    throw new Error('useCurrentUser must be used within a Provider');
  }
  return context;
}
