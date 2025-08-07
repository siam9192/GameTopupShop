import React from 'react';
import GameCard from '../cards/GameCard';
import { Grid, Typography } from '@mui/material';

function TopGames() {
  return (
    <div className="my-10">
      <Typography
        fontSize={{
          xs: 24,
          md: 28,
          lg: 32,
        }}
        fontFamily={'jost'}
        fontWeight={600}
        color="text.primary"
      >
        Top Games
      </Typography>
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
