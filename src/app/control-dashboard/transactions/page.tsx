import PaymentsOverviewData from '@/components/sections/control-dashboard/TransactionsOverViewData';
import RecentAdministratorsActivity from '@/components/sections/control-dashboard/RecentAdministratorsActivity';
import RecentUsers from '@/components/sections/control-dashboard/RecentUsers';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import { Grid } from '@mui/material';
import React from 'react';
import TransactionsOverviewData from '@/components/sections/control-dashboard/TransactionsOverViewData';
import TransactionsMethodsUsageChart from '@/components/sections/control-dashboard/TransactionMethodsUsageChart';


function page() {
  return (
    <div>
      <DashboardPageHeading title="Transactions" />
<TransactionsOverviewData/>
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
       <TransactionsMethodsUsageChart/>
        </Grid>
        <Grid size={1}>
          <TransactionsMethodsUsageChart/>
        </Grid>
      </Grid>
    </div>
  );
}

export default page;
