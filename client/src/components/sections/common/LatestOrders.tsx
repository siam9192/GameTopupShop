'use client';

import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import SectionHeading from '../../ui/SectionHeading';
import { getLatestOrdersQuery } from '@/query/services/order';
import LatestOrderCard from '../../cards/LatestOrderCard';

function LatestOrders() {
  const { data, isLoading } = getLatestOrdersQuery();
  const orders = data?.data ?? [];

  const isEmpty = !orders.length && !isLoading;

  return (
    <Box component="section" className="py-8">
      <div className="text-center mb-6">
        <SectionHeading title="Latest Orders" />
      </div>

      {isLoading && (
        <Box className="h-[300px] flex justify-center items-center">
          <CircularProgress />
        </Box>
      )}

      {isEmpty && (
        <Typography variant="h6" color="text.secondary" textAlign="center">
          No latest orders found
        </Typography>
      )}

      {!isLoading && !!orders.length && (
        <Box mt={5} className="lg:w-[80%] mx-auto space-y-5">
          {orders.map((order, index) => (
            <LatestOrderCard key={index} order={order} />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default LatestOrders;
