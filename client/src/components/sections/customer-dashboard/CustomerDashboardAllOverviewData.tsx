import { getCustomerDashboardMetadataQuery } from '@/query/services/metadata';
import React from 'react';
import { HiOutlineWallet } from 'react-icons/hi2';
import { TbTruckDelivery, TbCurrencyDollar } from 'react-icons/tb';
import { BsClipboardCheck } from 'react-icons/bs';
import DashboardOverviewData from '@/components/ui/DashboardOverviewData';
function CustomerDashboardAllOverviewData() {
  const { data, isLoading, error } = getCustomerDashboardMetadataQuery();

  const mapping = [
    {
      key: 'walletBalance',
      label: 'Wallet Balance',
      icon: HiOutlineWallet, // 🪙 Represents balance or funds
      isCurrency: true,
    },
    {
      key: 'orderInProcess',
      label: 'Orders In Process',
      icon: TbTruckDelivery, // 🚚 Represents ongoing delivery
    },
    {
      key: 'ordersCompleted',
      label: 'Orders Completed',
      icon: BsClipboardCheck, // ✅ Represents verified/completed orders
    },
    {
      key: 'ordersAmount',
      label: 'Orders Amount',
      icon: TbCurrencyDollar, // 💵 Represents money-related total
      isCurrency: true,
    },
  ];
  return <DashboardOverviewData data={data?.data} isLoading={isLoading} mapping={mapping} />;
}

export default CustomerDashboardAllOverviewData;
