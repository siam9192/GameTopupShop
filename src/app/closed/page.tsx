import React from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { MdLock } from 'react-icons/md';

function SiteClosedPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'background.default',
        px: 2,
      }}
    >
      <Stack spacing={3} alignItems="center" textAlign="center">
        <MdLock size={80} style={{ color: '#FF5722' }} />
        <Typography variant="h3" fontWeight={600}>
          Site Closed
        </Typography>
        <Typography variant="body1" color="text.secondary" maxWidth={400}>
          Our website is currently closed. Please check back later for updates.
        </Typography>
      </Stack>
    </Box>
  );
}

export default SiteClosedPage;
