import { Card, Grid } from '@mui/material';
import React from 'react';
import GameCard from '../cards/GameCard';

function FeaturedGames() {
  return (
    <div className="my-10">
      <h1 className="text-3xl font-semibold text-txt-primary ">Featured Games</h1>
      <div className="mt-5 grid grid-cols-7 gap-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <GameCard key={index} />
        ))}
      </div>
      <Grid container spacing={2}></Grid>
    </div>
  );
}

export default FeaturedGames;
