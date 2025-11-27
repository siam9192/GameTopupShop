'use client';
import { CircularProgress, Grid, Typography } from '@mui/material';
import React from 'react';
import OfferCard from '../../cards/OfferCard';
import SectionHeading from '../../ui/SectionHeading';
import { getEndingSoonOffersQuery } from '@/query/services/order';

function OfferComesEnd() {
  const { data, isLoading } = getEndingSoonOffersQuery([]);
  const offers = data?.data;

  return (
    <div className="my-10">
      <SectionHeading title="Offers Ending Soon" />
      {isLoading ? (
        <div className="h-[300px] flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : null}
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
        {offers?.map((_, index) => (
          <Grid key={index} size={1}>
            <OfferCard offer={_} />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2}></Grid>
    </div>
  );
}

export default OfferComesEnd;
