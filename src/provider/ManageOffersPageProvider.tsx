'use client';
import OffersFilterBox from '@/components/sections/control-dashboard/OffersFilterBox';
import OffersFilterBoxModal from '@/components/sections/control-dashboard/OffersFilterBoxModal';
import OffersTable from '@/components/sections/control-dashboard/OffersTable';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import { getOffersQuery } from '@/query/services/offer';
import { Param } from '@/types/metadata.type';
import { Offer } from '@/types/offer.type';
import { IResponse } from '@/types/response.type';
import { Filters, LayoutProps, SortOrder, SortState } from '@/types/utils.type';
import { UseQueryResult } from '@tanstack/react-query';
import React, { createContext, useContext, useEffect, useState } from 'react';

type OffersPageContextType = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  page: number;
  sort: SortState;
  setSort: React.Dispatch<React.SetStateAction<SortState>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  params: Param[];
  queryResult: UseQueryResult<IResponse<Offer[]>, unknown>;
};
const OffersPageContext = createContext<OffersPageContextType | null>(null);

function ManageOffersPageProvider({ children }: LayoutProps) {
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

  const queryResult = getOffersQuery(params);
  const { refetch, isLoading } = queryResult;

  const value: OffersPageContextType = {
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

  return <OffersPageContext.Provider value={value}>{children}</OffersPageContext.Provider>;
}

export default ManageOffersPageProvider;

export function useOffersPageContext() {
  const context = useContext(OffersPageContext);
  if (!context) throw new Error();
  return context;
}
