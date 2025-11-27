import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import { Typography } from '@mui/material';
import React from 'react';

function page() {
  return (
    <div>
      <DashboardPageHeading title="Settings" />
      <Typography color="text.primary" mt={1}>
        Settings will be added soon
      </Typography>
    </div>
  );
}

export default page;
