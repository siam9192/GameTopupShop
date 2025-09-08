import { Grid, Typography } from '@mui/material';
import React from 'react';
import OfferCard from '../cards/OfferCard';
import SectionHeading from '../ui/SectionHeading';

function OfferComesEnd() {
  return (
    <div className="my-10">
      <SectionHeading title="Offers Ending Soon" />
      <Grid
        marginTop={3}
        container
        spacing={2}
        columns={{
          xs: 1,
          md: 1,
          lg: 2,
          xl: 2,
        }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <Grid key={index} size={1}>
            <OfferCard />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2}></Grid>
    </div>
  );
}

export default OfferComesEnd;
