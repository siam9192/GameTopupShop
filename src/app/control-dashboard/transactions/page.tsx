import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import { Grid } from '@mui/material';
import React from 'react';
import TransactionsOverviewData from '@/components/sections/control-dashboard/TransactionsOverViewData';
import TransactionsMethodsUsageChart from '@/components/sections/control-dashboard/TransactionMethodsUsageChart';
import TransactionChart from '@/components/sections/control-dashboard/TrensactionChart';

function page() {
  return (
    <div>
      <DashboardPageHeading title="Transactions Overview" />
      <TransactionsOverviewData />
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
          <TransactionChart />
        </Grid>
        <Grid size={1}>
          <TransactionsMethodsUsageChart />
        </Grid>
      </Grid>
    </div>
  );
}

export default page;
