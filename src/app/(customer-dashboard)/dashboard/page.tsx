import RecentOrders from '@/components/sections/customer-dashboard/RecentOrders';
import UnreadNotifications from '@/components/sections/customer-dashboard/UnreadNotifications';
import AllOverviewData from '@/components/ui/AllOverviewData';
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
          xl: 2,
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
