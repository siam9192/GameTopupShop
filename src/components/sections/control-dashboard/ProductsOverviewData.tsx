'use client';
import DashboardOverviewData from '@/components/ui/DashboardOverviewData';
import { getProductsMetadataQuery } from '@/query/services/metadata';
import React from 'react';
import { MdInventory, MdFlashOn, MdLocalOffer, MdNewReleases } from 'react-icons/md';

function ProductsOverviewData() {
  const { data, isLoading } = getProductsMetadataQuery();
  const mapping = [
    {
      key: 'products',
      icon: MdInventory,
      label: 'Products',
    },
    {
      key: 'topups',
      icon: MdFlashOn,
      label: 'Topups',
    },
    {
      key: 'offers',
      icon: MdLocalOffer,
      label: 'Offers',
    },
    {
      key: 'recentProducts',
      icon: MdNewReleases,
      label: 'Recent Products',
    },
  ];

  return <DashboardOverviewData data={data?.data} mapping={mapping} isLoading={isLoading} />;
}

export default ProductsOverviewData;
