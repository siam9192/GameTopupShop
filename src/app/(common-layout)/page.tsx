import FeaturedGames from '@/components/sections/FeaturedGames';
import HomeBanner from '@/components/sections/HomeBanner';
import OfferComesEnd from '@/components/sections/OfferComesEnd';
import TopGames from '@/components/sections/TopGames';
import { Box, Typography } from '@mui/material';
import React from 'react';

function page() {
  return (
    <div>
      <Typography
        variant="h1"
        fontSize={{
          xs: 24,
          md: 28,
          lg: 32,
        }}
        fontWeight={500}
        color="text.primary"
        sx={{ fontFamily: 'var(--font-secondary)' }}
      >
        Hey,
        <Box component="span" sx={{ color: 'primary.main', display: 'inline-block', mb: 1 }}>
          Welcome
        </Box>
      </Typography>
      <HomeBanner />
      <FeaturedGames />
      <OfferComesEnd />
      <TopGames />
    </div>
  );
}

export default page;
