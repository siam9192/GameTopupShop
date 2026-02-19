'use client';
import RecentUserCard from '@/components/cards/RecentUserCard';
import DashboardSectionHeading from '@/components/ui/DashboardSectionHeading';
import { getRecentUserQuery } from '@/query/services/user';
import { Badge, Skeleton, Stack, Typography } from '@mui/material';
import React from 'react';
import { TbRecharging } from 'react-icons/tb';

function RecentUsers() {
  const { data, isLoading } = getRecentUserQuery();
  const users = data?.data;
  return (
    <Stack className="glass p-3 md:p-5 h-full min-h-[400px]  ">
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <DashboardSectionHeading title="Recent Users" />
        <Badge color="secondary" badgeContent={users?.length || 0} variant="standard">
          <TbRecharging className="text-txt-primary" size={28} />
        </Badge>
      </Stack>

      <Stack marginTop={2} spacing={2}>
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index}>
              <Skeleton variant="rectangular" height={150} width="100%" className="rounded-lg" />
            </div>
          ))
        ) : users?.length ? (
          users?.map((_, index) => <RecentUserCard user={_} key={index} />)
        ) : (
          <Typography variant="h6" align="center" color="text.primary">
            No recent users found
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}

export default RecentUsers;
