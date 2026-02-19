'use client';
import { CircularProgress, Grid, Typography } from '@mui/material';
import React from 'react';
import TopupCard from '../../cards/TopupCard';
import { getFeaturedTopupsQuery } from '@/query/services/topup';
import SectionHeading from '../../ui/SectionHeading';

function FeaturedTopups() {
  const { data, isLoading } = getFeaturedTopupsQuery([
    {
      name: 'limit',
      value: 10,
    },
  ]);
  const topups = data?.data;
  const meta = data?.meta;
  return (
    <div className="my-10">
      <SectionHeading title="Featured Topups" />
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
          xs: 2,
          md: 3,
          xl: 5,
        }}
      >
        {topups?.map((_, index) => (
          <Grid key={index} size={1}>
            <TopupCard topup={_} />
          </Grid>
        ))}
      </Grid>
      {meta?.totalResults === 0 && (
        <Typography variant="h5" color="text.primary" align="center">
          No results
        </Typography>
      )}
    </div>
  );
}

export default FeaturedTopups;
