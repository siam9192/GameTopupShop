'use client';
import TransactionsFilterBox from '@/components/sections/control-dashboard/TransactionsFilterBox';
import TransactionsFilterBoxModal from '@/components/sections/control-dashboard/TransactionsFilterBoxModal';
import TransactionsTable from '@/components/sections/control-dashboard/TransactionsTable';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import { getTransactionsQuery } from '@/query/services/transaction';
import { Param } from '@/types/metadata.type';
import { IResponse } from '@/types/response.type';
import { Transaction } from '@/types/transaction.type';
import { Filters, SortOrder, SortState } from '@/types/utils.type';
import { UseQueryResult } from '@tanstack/react-query';
import React, { createContext, useContext, useEffect, useState } from 'react';

type TransactionsPageContextType = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  page: number;
  sort: SortState;
  setSort: React.Dispatch<React.SetStateAction<SortState>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  params: Param[];
  queryResult: UseQueryResult<IResponse<Transaction[]>, unknown>;
};
const TransactionsPageContext = createContext<TransactionsPageContextType | null>(null);

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

  const queryResult = getTransactionsQuery(params);
  const { refetch, isLoading } = queryResult;

  const value: TransactionsPageContextType = {
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
    <TransactionsPageContext.Provider value={value}>
      <div>
        <DashboardPageHeading title="Transactions" />
        <TransactionsFilterBox />
        <div className="flex justify-end">
          <TransactionsFilterBoxModal />
        </div>
        <TransactionsTable />
      </div>
    </TransactionsPageContext.Provider>
  );
}

export default page;

export function useTransactionsPageContext() {
  const context = useContext(TransactionsPageContext);
  if (!context) throw new Error();
  return context;
}
