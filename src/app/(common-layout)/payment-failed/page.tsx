'use client';
import React from 'react';
import { Box, Button, Stack, Typography, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function PaymentFailedPage() {
  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
        bgcolor: 'background.default',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 5,
          maxWidth: 450,
          width: '100%',
          textAlign: 'center',
          borderRadius: 4,
        }}
      >
        <Stack spacing={3}>
          {/* Error Icon */}
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mx: 'auto',
              bgcolor: 'error.light',
              color: 'error.main',
              marginX: 'auto',
            }}
          >
            <ErrorOutlineIcon sx={{ fontSize: 45 }} />
          </Box>

          {/* Title */}
          <Typography variant="h4" fontWeight={700}>
            Payment Failed
          </Typography>

          {/* Description */}
          <Typography variant="body1" color="text.secondary">
            Your payment could not be processed at the moment. Please try again or use a different
            payment method.
          </Typography>

          {/* Buttons */}
          <Stack spacing={2} mt={2}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              sx={{ py: 1.2, borderRadius: 2 }}
              onClick={() => (window.location.href = '/')}
            >
              Go Home
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
