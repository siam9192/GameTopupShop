'use client';
import CustomersFilterBox from '@/components/sections/control-dashboard/CustomersFilterBox';
import CustomersFilterBoxModal from '@/components/sections/control-dashboard/CustomersFilterBoxModal';
import CustomersTable from '@/components/sections/control-dashboard/CustomersTable';
import TopUpsFilterBox from '@/components/sections/control-dashboard/TopUpsFilterBox';
import TopUpsFilterBoxModal from '@/components/sections/control-dashboard/TopUpsFilterBoxModal';
import TopUpsTable from '@/components/sections/control-dashboard/TopUpsTable';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import { getCustomersQuery } from '@/query/services/customer';
import { Customer } from '@/types/customer.type';
import { Param } from '@/types/metadata.type';
import { IResponse } from '@/types/response.type';
import { Filters, SortOrder, SortState } from '@/types/utils.type';
import { UseQueryResult } from '@tanstack/react-query';
import React, { createContext, useContext, useEffect, useState } from 'react';

type CustomersPageContextType = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  page: number;
  sort: SortState;
  setSort: React.Dispatch<React.SetStateAction<SortState>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  params: Param[];
  queryResult: UseQueryResult<IResponse<Customer[]>, unknown>;
};
const CustomersPageContext = createContext<CustomersPageContextType | null>(null);

function page() {
  const [filters, setFilters] = useState<Filters>({});
  const [sort, setSort] = useState<SortState>({
    by: 'createdAt',
    order: SortOrder.DESC,
  });
  const [page, setPage] = useState(1);

  const params: Param[] = [
    { name: 'page', value: page },
    ...Object.entries(filters).map(([key, value]) => ({ name: key, value })),
    { name: 'sortBy', value: sort.by },
    { name: 'sortOrder', value: sort.order },
  ];

  const queryResult = getCustomersQuery(params);
  const { refetch, isLoading } = queryResult;

  const value: CustomersPageContextType = {
    filters,
    setFilters,
    params,
    page,
    setPage,
    sort,
    setSort,
    queryResult,
  };

  useEffect(() => {
    if (isLoading) return;
    refetch();
  }, [page, sort, filters]);

  return (
    <CustomersPageContext.Provider value={value}>
      <div>
        <DashboardPageHeading title="Top ups" />
        <CustomersFilterBox />
        <div className="flex justify-end">
          <CustomersFilterBoxModal />
        </div>
        <CustomersTable />
      </div>
    </CustomersPageContext.Provider>
  );
}

export default page;

export function useCustomersPageContext() {
  const context = useContext(CustomersPageContext);
  if (!context) throw new Error();
  return context;
}
