'use client';
import React from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
import SectionHeading from '../../ui/SectionHeading';
import { getPopularTopupsQuery } from '@/query/services/topup';
import TopupCard from '../../cards/TopupCard';

function TopTopups() {
  const { data, isLoading } = getPopularTopupsQuery([]);
  const topups = data?.data;
  const meta = data?.meta;

  return (
    <div className="my-10">
      <SectionHeading title="Top Topups" />
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
          lg: 5,
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

export default TopTopups;
