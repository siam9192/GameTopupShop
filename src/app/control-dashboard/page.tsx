import AllOverviewData from '@/components/sections/control-dashboard/AllOverviewData';
import NewCustoomerChart from '@/components/sections/control-dashboard/NewCustomerChart';
import RecentOrders from '@/components/sections/control-dashboard/RecentOrders';
import RevenueChart from '@/components/sections/control-dashboard/RevenueChart';
import UnreadNotifications from '@/components/sections/CustomerDashboard/UnreadNotifications';
import { Grid } from '@mui/material';
import React from 'react';

function page() {
  return (
    <div>
      <AllOverviewData />
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
          <RevenueChart />
        </Grid>
        <Grid size={1}>
          <NewCustoomerChart />
        </Grid>
      </Grid>
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
          <RecentOrders />
        </Grid>
        <Grid size={1}>
          <UnreadNotifications />
        </Grid>
      </Grid>
    </div>
  );
}

export default page;
