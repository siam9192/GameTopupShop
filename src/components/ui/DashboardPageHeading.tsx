import { Typography } from '@mui/material';
import React from 'react';

function DashboardPageHeading({ title }: { title: string }) {
  return (
    <Typography
      component={'h1'}
      variant="h4"
      fontSize={{
        xs: 25,
        md: 30,
      }}
      fontFamily={'jost'}
      fontWeight={600}
      color="text.primary"
      mb={2}
    >
      {title}
    </Typography>
  );
}

export default DashboardPageHeading;
