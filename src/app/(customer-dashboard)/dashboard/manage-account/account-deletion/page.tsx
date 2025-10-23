import { Box, Typography } from '@mui/material';
import React from 'react';

function page() {
  return (
    <Box width={{ xs: '100%', lg: '80%' }} height={'100%'}>
      <Typography fontSize={20} fontWeight={600} color="text.primary" mb={2}>
        Account Deletion
      </Typography>

      <Typography color="info" align="center">
        Currently not available
      </Typography>
    </Box>
  );
}

export default page;
