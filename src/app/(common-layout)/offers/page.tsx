import OfferCard from '@/components/cards/OfferCard';
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
        Available Offers
      </Typography>

      <Grid
        container
        marginTop={4}
        spacing={2}
        columns={{
          sm: 1,
          lg: 2,
        }}
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <Grid size={1} key={index}>
            <OfferCard />
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
