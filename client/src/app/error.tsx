'use client';

import React from 'react';
import { Box, Typography, Button, Paper, Stack, useTheme, useMediaQuery } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';

interface Props {
  code?: string | number;
  title?: string;
  message?: string;
  onBack?: () => void;
}

export default function ErrorPage({
  code = 404,
  title = 'Something went wrong',
  message = 'An unexpected error occurred.',
  onBack,
}: Props) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

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
          maxWidth: 920,
          borderRadius: 3,
          p: { xs: 3, md: 6 },
          boxShadow: '0 10px 30px rgba(2,6,23,0.15)',
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
          {/* Error Icon + Code */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: '100%', md: 240 },
              height: { xs: 140, md: 200 },
              borderRadius: 2,
              background: theme =>
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))'
                  : 'linear-gradient(135deg, rgba(2,6,23,0.03), rgba(2,6,23,0.01))',
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <ErrorOutlineIcon
                sx={{ fontSize: { xs: 60, md: 84 }, opacity: 0.95 }}
                color="error"
              />
              <Typography variant="h3" component="div" sx={{ mt: 1, fontWeight: 700 }}>
                {code}
              </Typography>
            </Box>
          </Box>

          {/* Error Content */}
          <Box sx={{ flex: 1 }}>
            <Typography variant={isSm ? 'h5' : 'h4'} sx={{ fontWeight: 700 }} gutterBottom>
              {title}
            </Typography>

            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
              {message}
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                variant="contained"
                startIcon={<HomeIcon />}
                onClick={() => {
                  if (typeof onBack === 'function') onBack();
                  else window.history.back();
                }}
                sx={{ px: 3 }}
              >
                Go back
              </Button>

              <Button variant="outlined" onClick={() => window.location.reload()} sx={{ px: 3 }}>
                Refresh
              </Button>
            </Stack>

            <Box sx={{ mt: 4 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Tip: If this keeps happening, contact support or try clearing your browser cache.
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
