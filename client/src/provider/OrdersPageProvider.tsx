'use client';

import OrdersFilterBox from '@/components/sections/control-dashboard/OrdersFilterBox';
import OrdersFilterBoxModal from '@/components/sections/control-dashboard/OrdersFilterBoxModal';
import OrdersTable from '@/components/sections/control-dashboard/OrdersTable';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import { getOrdersQuery } from '@/query/services/order';
import { Param } from '@/types/metadata.type';
import { Order } from '@/types/order.type';
import { IResponse } from '@/types/response.type';
import { Filters, LayoutProps, SortOrder, SortState } from '@/types/utils.type';
import { UseQueryResult } from '@tanstack/react-query';
import React, { createContext, useContext, useEffect, useState } from 'react';

type OrdersPageContextType = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  page: number;
  sort: SortState;
  setSort: React.Dispatch<React.SetStateAction<SortState>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  params: Param[];
  queryResult: UseQueryResult<IResponse<Order[]>, unknown>;
};
const OrdersPageContext = createContext<OrdersPageContextType | null>(null);

function OrdersPageProvider({ children }: LayoutProps) {
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

  const queryResult = getOrdersQuery(params);
  const { refetch, isLoading } = queryResult;

  const value: OrdersPageContextType = {
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

  return <OrdersPageContext.Provider value={value}>{children}</OrdersPageContext.Provider>;
}

export default OrdersPageProvider;

export function useOrdersPageContext() {
  const context = useContext(OrdersPageContext);
  if (!context) throw new Error();
  return context;
}
