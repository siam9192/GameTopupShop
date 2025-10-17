'use client';
import CustomersWalletFilterBox from '@/components/sections/control-dashboard/CustomersWalletFilterBox';
import CustomersWalletFilterModal from '@/components/sections/control-dashboard/CustomersWalletFilterModal';
import CustomersWalletTable from '@/components/sections/control-dashboard/CustomersWalletTable';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import { getWalletsQuery } from '@/query/services/wallet';
import { Param } from '@/types/metadata.type';
import { IResponse } from '@/types/response.type';
import { Filters, SortOrder, SortState } from '@/types/utils.type';
import { Wallet } from '@/types/wallet.type';
import { UseQueryResult } from '@tanstack/react-query';
import React, { createContext, useContext, useEffect, useState } from 'react';

type CustomersWalletPageContextType = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  page: number;
  sort: SortState;
  setSort: React.Dispatch<React.SetStateAction<SortState>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  params: Param[];
  queryResult: UseQueryResult<IResponse<Wallet[]>, unknown>;
};
const CustomersWalletPageContext = createContext<CustomersWalletPageContextType | null>(null);

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

  const queryResult = getWalletsQuery(params);
  const { refetch, isLoading } = queryResult;

  const value: CustomersWalletPageContextType = {
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
    <CustomersWalletPageContext.Provider value={value}>
      <div>
        <DashboardPageHeading title="Customers Wallet" />
        <CustomersWalletFilterBox />
        <div className="flex justify-end">
          <CustomersWalletFilterModal />
        </div>
        <CustomersWalletTable />
      </div>
    </CustomersWalletPageContext.Provider>
  );
}

export default page;

export function useCustomersWalletPageContext() {
  const context = useContext(CustomersWalletPageContext);
  if (!context) throw new Error();
  return context;
}
