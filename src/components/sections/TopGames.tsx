import React from 'react';
import GameCard from '../cards/GameCard';
import { Grid, Typography } from '@mui/material';
import SectionHeading from '../ui/SectionHeading';

function TopGames() {
  return (
    <div className="my-10">
      <SectionHeading title="Top Games" />
      <Grid
        marginTop={3}
        container
        spacing={2}
        columns={{
          xs: 2,
          md: 3,
          lg: 5,
          xl: 7,
        }}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <Grid key={index} size={1}>
            <GameCard />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2}></Grid>
    </div>
  );
}

export default TopGames;
