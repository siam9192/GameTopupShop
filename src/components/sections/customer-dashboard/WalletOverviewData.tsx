'use client';
import DashboardOverviewData from '@/components/ui/DashboardOverviewData';
import { getCustomerWalletMetadataQuery } from '@/query/services/metadata';
import React from 'react';

import { HiOutlineWallet } from 'react-icons/hi2';
import { TbArrowBigDownLines, TbCalendarTime } from 'react-icons/tb';
import { IoHourglassOutline } from 'react-icons/io5';

function WalletOverviewData() {
  const { data, isLoading } = getCustomerWalletMetadataQuery();

  const mapping = [
    {
      key: 'balance',
      label: 'Available Balance',
      icon: HiOutlineWallet,
      isCurrency: true,
    },
    {
      key: 'totalSpend',
      label: 'Total Spend',
      icon: TbArrowBigDownLines,
      isCurrency: true,
    },
    {
      key: 'last30daysSpend',
      label: 'Last 30 Days Spend',
      icon: TbCalendarTime,
      isCurrency: true,
    },
    {
      key: 'pendingAmount',
      label: 'Amount Pending',
      icon: IoHourglassOutline,
      isCurrency: true,
    },
  ];

  return <DashboardOverviewData data={data?.data} isLoading={isLoading} mapping={mapping} />;
}

export default WalletOverviewData;
