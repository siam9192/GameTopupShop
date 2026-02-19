'use client';
import ManualPaymentMethodsFilterBox from '@/components/sections/control-dashboard/ManualPaymentMethodsFilterBox';
import ManualPaymentMethodsFilterBoxModal from '@/components/sections/control-dashboard/ManualPaymentMethodsFilterBoxModal';
import ManualPaymentMethodsTable from '@/components/sections/control-dashboard/ManualPaymentMethodsTable';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import { getManualPaymentMethodsQuery } from '@/query/services/manual-payment-method';
import { ManualPaymentMethod } from '@/types/manual-payment-method.type';
import { Param } from '@/types/metadata.type';
import { IResponse } from '@/types/response.type';
import { Filters, LayoutProps, SortOrder, SortState } from '@/types/utils.type';
import { UseQueryResult } from '@tanstack/react-query';
import React, { createContext, useContext, useEffect, useState } from 'react';

type ManualPaymentMethodsPageContextType = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  page: number;
  sort: SortState;
  setSort: React.Dispatch<React.SetStateAction<SortState>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  params: Param[];
  queryResult: UseQueryResult<IResponse<ManualPaymentMethod[]>, unknown>;
};
const ManualPaymentMethodsPageContext = createContext<ManualPaymentMethodsPageContextType | null>(
  null,
);

function ManualPaymentMethodsPageProvider({ children }: LayoutProps) {
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

  const queryResult = getManualPaymentMethodsQuery(params);
  const { refetch, isLoading } = queryResult;

  const value: ManualPaymentMethodsPageContextType = {
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
    <ManualPaymentMethodsPageContext.Provider value={value}>
      {children}
    </ManualPaymentMethodsPageContext.Provider>
  );
}

export default ManualPaymentMethodsPageProvider;

export function useManualPaymentMethodsPageContext() {
  const context = useContext(ManualPaymentMethodsPageContext);
  if (!context) throw new Error();
  return context;
}
