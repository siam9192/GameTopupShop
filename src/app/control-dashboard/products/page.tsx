import NewCustoomerChart from '@/components/sections/control-dashboard/NewCustomerChart';
import PopularOffers from '@/components/sections/control-dashboard/PopularOffers';
import PopularProducts from '@/components/sections/control-dashboard/PopularProducts';
import PopularTopUps from '@/components/sections/control-dashboard/PopularTopUps';
import ProductsOverviewData from '@/components/sections/control-dashboard/ProductsOverviewData';
import RecentOrders from '@/components/sections/control-dashboard/RecentOrders';
import RevenueChart from '@/components/sections/control-dashboard/RevenueChart';
import UnreadNotifications from '@/components/sections/CustomerDashboard/UnreadNotifications';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import { Grid } from '@mui/material';
import React from 'react';

function page() {
  return (
    <div>
      <DashboardPageHeading title="Products" />
      <ProductsOverviewData />

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
          <PopularTopUps />
        </Grid>
        <Grid size={1}>
          <PopularOffers />
        </Grid>
      </Grid>
    </div>
  );
}

export default page;
