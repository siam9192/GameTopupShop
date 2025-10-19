'use client';
import RecentOrderCard from '@/components/cards/RecentOrderCard';
import { getRecentOrdersQuery } from '@/query/services/order';
import { Badge, Box, CircularProgress, Divider, Stack, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { TbRecharging } from 'react-icons/tb';

function RecentOrders() {
  const now = new Date();

  const recentDate = new Date(now);
  recentDate.setDate(now.getDate() - 365);
  const { data, isLoading } = getRecentOrdersQuery(recentDate.toDateString(), [
    {
      name: 'limit',
      value: '10',
    },
  ]);
  const orders = data?.data;
  const meta = data?.meta;
  return (
    <div className="glass p-3 md:p-5 h-full min-h-[500px]   ">
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
        <Badge color="secondary" badgeContent={meta?.totalResults || 0} variant="standard">
          <TbRecharging className="text-txt-primary" size={28} />
        </Badge>
      </Stack>

      {isLoading ? (
        <div className="h-[300px]  flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <Box>
          <Stack marginTop={2} spacing={2}>
            {orders?.map((_, index) => (
              <Fragment key={index}>
                {index !== 0 ? <Divider /> : null}
                <RecentOrderCard order={_} />
              </Fragment>
            ))}
          </Stack>
          {meta?.totalResults === 0 ? (
            <Typography mt={10} variant="h5" color="text.primary" align="center">
              No results
            </Typography>
          ) : null}
        </Box>
      )}
    </div>
  );
}

export default RecentOrders;
