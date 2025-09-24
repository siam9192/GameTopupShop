import RecentAddBalanceSubmissions from '@/components/sections/customer-dashboard/RecentAddBalanceSubmissions';
import RecentWalletHistories from '@/components/sections/customer-dashboard/RecentWalletHistories';
import WalletOverviewData from '@/components/sections/customer-dashboard/WalletOverviewData';
import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { HiPlus } from 'react-icons/hi2';

function page() {
  return (
    <div>
      <WalletOverviewData />
      <div className="mt-10 text-end">
        <Button variant="outlined">
          <span>
            <HiPlus size={20} />
          </span>
          <span>Add Balance</span>
        </Button>
      </div>
      <Grid
        marginTop={5}
        container
        columns={{
          xs: 1,
          lg: 2,
        }}
        spacing={2}
      >
        <Grid size={1}>
          <RecentAddBalanceSubmissions />
        </Grid>
        <Grid size={1}>
          <RecentWalletHistories />
        </Grid>
      </Grid>
    </div>
  );
}

export default page;
