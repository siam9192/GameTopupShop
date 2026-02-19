import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { MdOutlineBuild } from 'react-icons/md';
import Link from 'next/link';

function MaintenanceMessage() {
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
        <MdOutlineBuild size={80} style={{ color: '#FF9800' }} />
        <Typography variant="h3" fontWeight={600}>
          Site Under Maintenance
        </Typography>
        <Typography variant="body1" color="text.secondary" maxWidth={400}>
          Our website is currently undergoing scheduled maintenance. We’ll be back shortly!
        </Typography>
        <Link href="/">
          <Button variant="contained" color="primary">
            Go to Home
          </Button>
        </Link>
      </Stack>
    </Box>
  );
}

export default MaintenanceMessage;
