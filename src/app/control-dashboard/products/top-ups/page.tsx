'use client';
import TopUpsFilterBox from '@/components/sections/control-dashboard/TopUpsFilterBox';
import TopUpsFilterBoxModal from '@/components/sections/control-dashboard/TopUpsFilterBoxModal';
import TopUpsTable from '@/components/sections/control-dashboard/TopUpsTable';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import { getTopupsQuery } from '@/query/services/topup';
import { Param } from '@/types/metadata.type';
import { IResponse } from '@/types/response.type';
import { Topup } from '@/types/topup.type';
import { Filters, SortOrder, SortState } from '@/types/utils.type';
import { UseQueryResult } from '@tanstack/react-query';
import React, { createContext, useContext, useEffect, useState } from 'react';

type TopupsPageContextType = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  page: number;
  sort: SortState;
  setSort: React.Dispatch<React.SetStateAction<SortState>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  params: Param[];
  queryResult: UseQueryResult<IResponse<Topup[]>, unknown>;
};
const TopupPageContext = createContext<TopupsPageContextType | null>(null);

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

  const queryResult = getTopupsQuery(params);
  const { refetch, isLoading } = queryResult;

  const value: TopupsPageContextType = {
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
    <TopupPageContext.Provider value={value}>
      <div>
        <DashboardPageHeading title="Top ups" />
        <TopUpsFilterBox />
        <div className="flex justify-end">
          <TopUpsFilterBoxModal />
        </div>
        <TopUpsTable />
      </div>
    </TopupPageContext.Provider>
  );
}

export default page;

export function useTopupPageContext() {
  const context = useContext(TopupPageContext);
  if (!context) throw new Error();
  return context;
}
