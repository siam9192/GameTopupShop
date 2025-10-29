import FeaturedTopups from '@/components/sections/FeaturedTopUps';
import HomeBanner from '@/components/sections/HomeBanner';
import LatestOrders from '@/components/sections/LatestOrders';
import OfferComesEnd from '@/components/sections/OfferComesEnd';
import TopTopups from '@/components/sections/TopTopups';
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
      <FeaturedTopups />
      <OfferComesEnd />
      <TopTopups />
      <LatestOrders />
    </div>
  );
}

export default page;
