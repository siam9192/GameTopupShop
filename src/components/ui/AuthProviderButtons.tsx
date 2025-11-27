'use client';

import { Box, Button } from '@mui/material';
import { signIn } from 'next-auth/react';
import { FaFacebook, FaGoogle } from 'react-icons/fa6';

function AuthProviderButtons() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Button
        fullWidth
        variant="outlined"
        onClick={() => signIn('google')}
        startIcon={<FaGoogle />}
        sx={{
          py: 1,
          borderRadius: '999px',
          textTransform: 'none',
          fontSize: '15px',
          '&:hover': { backgroundColor: '#f5f5f5' },
        }}
      >
        Continue with Google
      </Button>

      <Button
        fullWidth
        variant="outlined"
        onClick={() => signIn('facebook')}
        startIcon={<FaFacebook />}
        sx={{
          py: 1,
          borderRadius: '999px',
          textTransform: 'none',
          fontSize: '15px',
          '&:hover': { backgroundColor: '#f5f5f5' },
        }}
      >
        Continue with Facebook
      </Button>
    </Box>
  );
}

export default AuthProviderButtons;
