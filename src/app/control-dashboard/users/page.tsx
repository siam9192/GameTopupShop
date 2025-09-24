import RecentAdministratorsActivity from '@/components/sections/control-dashboard/RecentAdministratorsActivity';
import RecentUsers from '@/components/sections/control-dashboard/RecentUsers';
import UsersOverviewData from '@/components/sections/control-dashboard/UsersOverviewData';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import { Grid } from '@mui/material';
import React from 'react';

function page() {
  return (
    <div>
      <DashboardPageHeading title="Users" />
      <UsersOverviewData />

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
          <RecentAdministratorsActivity />
        </Grid>
        <Grid size={1}>
          <RecentUsers />
        </Grid>
      </Grid>
    </div>
  );
}

export default page;
