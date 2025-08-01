import AllOverviewData from '@/components/sections/CustomerDashboard/AllOverviewData';
import RecentOrders from '@/components/sections/CustomerDashboard/RecentOrders';
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
