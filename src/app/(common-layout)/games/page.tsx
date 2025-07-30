import GameCard from '@/components/cards/GameCard';
import { Grid, Pagination, Stack, Typography } from '@mui/material';
import React from 'react';

function page() {
  return (
    <div>
      <Typography
        fontFamily={'jost'}
        sx={{
          fontSize: {
            xs: 24,
            sm: 28,
            md: 30,
            lg: 36,
          },
        }}
        fontWeight={500}
        variant="h5"
        color="text.primary"
        component={'h1'}
      >
        Available Games Topup
      </Typography>

      <Grid
        container
        marginTop={2}
        spacing={{
          xs: 1,
          md: 2,
        }}
        columns={{
          xs: 2,
          sm: 2,
          md: 3,
          lg: 5,
          xl: 6,
        }}
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <Grid size={1} key={index}>
            <GameCard />
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} marginTop={5}>
        <Pagination count={10} size="large" variant="outlined" shape="rounded" />
      </Stack>
    </div>
  );
}

export default page;
