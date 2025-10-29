'use client';
import CustomerRecentOrderCard from '@/components/cards/CustomerRecentOrderCard';
import { getMyRecentOrdersQuery } from '@/query/services/order';
import { Badge, CircularProgress, Divider, Stack, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { TbRecharging } from 'react-icons/tb';

function RecentOrders() {
  const recentDate = new Date();
  recentDate.setDate(recentDate.getDate() - 60);
  recentDate.setHours(0, 0, 0, 0); // reset time to midnight

  const { data, isLoading } = getMyRecentOrdersQuery(recentDate.toISOString(), []);
  const recentOrders = data?.data;
  return (
    <Stack className="glass p-3 md:p-5 h-full  ">
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography
          component={'h1'}
          variant="h5"
          fontFamily={'jost'}
          fontWeight={600}
          color="text.primary"
        >
          Recent Orders
        </Typography>
        <Badge color="secondary" badgeContent={recentOrders?.length || 0} variant="standard">
          <TbRecharging className="text-txt-primary" size={28} />
        </Badge>
      </Stack>

      {isLoading ? (
        <div className="h-[300px] flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : null}

      <Stack marginTop={2} spacing={2}>
        {recentOrders?.map((_, index) => (
          <Fragment key={index}>
            {index !== 0 ? <Divider /> : null}
            <CustomerRecentOrderCard order={_} />
          </Fragment>
        ))}
      </Stack>
    </Stack>
  );
}

export default RecentOrders;
