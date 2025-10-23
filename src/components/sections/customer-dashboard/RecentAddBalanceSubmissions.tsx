'use client';
import RecentAddBalanceSubmissionCard from '@/components/cards/CustomerRecentAddBalanceSubmissionCard';
import {
  getMyRecentWalletSubmissionsQuery,
  getMyWalletSubmissionsQuery,
} from '@/query/services/wallet-submission';
import { Badge, CircularProgress, Divider, Stack, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { TbRecharging } from 'react-icons/tb';

function RecentAddBalanceSubmissions() {
  const { data, isLoading } = getMyRecentWalletSubmissionsQuery([
    {
      name: 'days',
      value: 90,
    },
  ]);
  const submissions = data?.data;
  const meta = data?.meta;

  return (
    <Stack className="mt-10 glass p-3 md:p-5 h-full  min-h-[400px] ">
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography
          component={'h1'}
          variant="h5"
          fontFamily={'jost'}
          fontWeight={600}
          color="text.primary"
        >
          Recent Add Submissions
        </Typography>
        <Badge color="secondary" badgeContent={submissions?.length} variant="standard">
          <TbRecharging className="text-txt-primary" size={28} />
        </Badge>
      </Stack>

      {isLoading ? <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} /> : null}

      {meta?.totalResults === 0 && (
        <Typography variant="h5" color="text.primary" align="center">
          No recent submissions
        </Typography>
      )}

      <Stack marginTop={2} spacing={2}>
        {submissions?.map((_, index) => (
          <Fragment key={index}>
            {index !== 0 ? <Divider /> : null}
            <RecentAddBalanceSubmissionCard submission={_} key={index} />
          </Fragment>
        ))}
      </Stack>
    </Stack>
  );
}

export default RecentAddBalanceSubmissions;
