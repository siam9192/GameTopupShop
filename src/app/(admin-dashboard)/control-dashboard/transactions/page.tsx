import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import { Grid } from '@mui/material';
import React from 'react';
import TransactionsOverviewData from '@/components/sections/control-dashboard/TransactionsOverViewData';
import TransactionChart from '@/components/sections/control-dashboard/TrensactionChart';
import TransactionStatusBreakdownChart from '@/components/sections/control-dashboard/TransactionStatusBreakdownChart';

function page() {
  return (
    <div>
      <DashboardPageHeading title="Transactions Overview" />
      <TransactionsOverviewData />

      <Grid container spacing={3} marginTop={4} columns={{ xs: 1, md: 2 }} alignItems="stretch">
        {/* Left: Transaction Status Chart */}
        <Grid size={{ xs: 1, md: 1 }}>
          <div className="h-full">
            <TransactionStatusBreakdownChart />
          </div>
        </Grid>

        {/* Right: Transaction Trend / Methods Chart */}
        <Grid size={{ xs: 1, md: 1 }}>
          <div className="h-full flex flex-col justify-between space-y-5">
            <TransactionChart />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default page;
