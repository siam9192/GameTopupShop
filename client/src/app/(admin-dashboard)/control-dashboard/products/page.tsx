import PopularOffers from '@/components/sections/control-dashboard/PopularOffers';
import PopularTopUps from '@/components/sections/control-dashboard/PopularTopUps';
import ProductsOverviewData from '@/components/sections/control-dashboard/ProductsOverviewData';
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
