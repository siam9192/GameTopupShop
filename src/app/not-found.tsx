'use client';

import React from 'react';
import { Box, Typography, Button, Paper, Stack, useTheme, useMediaQuery } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme =>
          theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, #0f1724 0%, #071026 100%)'
            : 'linear-gradient(180deg, #f7fafc 0%, #eef2f7 100%)',
        p: 3,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: '100%',
          maxWidth: 720,
          borderRadius: 3,
          p: { xs: 3, md: 6 },
          boxShadow: '0 10px 30px rgba(2,6,23,0.15)',
          textAlign: 'center',
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: 120, md: 180 },
              height: { xs: 120, md: 180 },
              borderRadius: '50%',
              background:
                theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            }}
          >
            <SearchOffIcon sx={{ fontSize: { xs: 70, md: 100 } }} color="error" />
          </Box>

          <Typography variant={isSm ? 'h5' : 'h4'} fontWeight={700} color="text.primary">
            404 - Page Not Found
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mb: 1 }}>
            Oops! The page you’re looking for doesn’t exist or might have been moved.
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mt: 2 }}
          >
            <Button
              variant="contained"
              startIcon={<HomeIcon />}
              onClick={() => router.push('/')}
              sx={{ px: 3 }}
            >
              Go Home
            </Button>

            <Button variant="outlined" onClick={() => router.back()} sx={{ px: 3 }}>
              Go Back
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
