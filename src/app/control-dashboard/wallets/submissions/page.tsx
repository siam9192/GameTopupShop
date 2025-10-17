'use client';
import WalletAddBalanceSubmissionsFilterBox from '@/components/sections/control-dashboard/WalletAddBalanceSubmissionsFilterBox';
import WalletAddBalanceSubmissionsFilterBoxModal from '@/components/sections/control-dashboard/WalletAddBalanceSubmissionsFilterBoxModal';
import WalletAddBalanceSubmissionsTable from '@/components/sections/control-dashboard/WalletAddBalanceSubmissionsTable';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import { getWalletSubmissionsQuery } from '@/query/services/wallet-submission';
import { Param } from '@/types/metadata.type';
import { IResponse } from '@/types/response.type';
import { Filters, SortOrder, SortState } from '@/types/utils.type';
import { WalletSubmission } from '@/types/wallet-submission.type';
import { UseQueryResult } from '@tanstack/react-query';
import React, { createContext, useContext, useEffect, useState } from 'react';

type WalletAddBalanceSubmissionsPageContextType = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  page: number;
  sort: SortState;
  setSort: React.Dispatch<React.SetStateAction<SortState>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  params: Param[];
  queryResult: UseQueryResult<IResponse<WalletSubmission[]>, unknown>;
};
const WalletAddBalanceSubmissionsPageContext =
  createContext<WalletAddBalanceSubmissionsPageContextType | null>(null);

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

  const queryResult = getWalletSubmissionsQuery(params);
  const { refetch, isLoading } = queryResult;

  const value: WalletAddBalanceSubmissionsPageContextType = {
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
    <WalletAddBalanceSubmissionsPageContext.Provider value={value}>
      <div>
        <DashboardPageHeading title="Add Balance Submissions" />
        <WalletAddBalanceSubmissionsFilterBox />
        <div className="flex justify-end">
          <WalletAddBalanceSubmissionsFilterBoxModal />
        </div>
        <WalletAddBalanceSubmissionsTable />
      </div>
    </WalletAddBalanceSubmissionsPageContext.Provider>
  );
}

export default page;

export function useWalletAddBalanceSubmissionsPageContext() {
  const context = useContext(WalletAddBalanceSubmissionsPageContext);
  if (!context) throw new Error();
  return context;
}
