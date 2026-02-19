import { Typography } from '@mui/material';
import React from 'react';

function DashboardSectionHeading({ title }: { title: string }) {
  return (
    <Typography
      component={'h1'}
      variant="h5"
      fontFamily={'jost'}
      fontWeight={600}
      color="text.primary"
    >
      {title}
    </Typography>
  );
}

export default DashboardSectionHeading;
