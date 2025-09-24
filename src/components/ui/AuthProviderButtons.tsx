'use client';
import { Box, Button, Link, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import React from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
function AuthProviderButtons() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Button
        fullWidth
        variant="outlined"
        onClick={() => signIn('google')}
        startIcon={<FaGoogle />}
      >
        Sign in with Google
      </Button>
      <Button
        fullWidth
        variant="outlined"
        onClick={() => signIn('facebook')}
        startIcon={<FaFacebook />}
      >
        Sign in with Facebook
      </Button>
      <Typography sx={{ textAlign: 'center' }}>
        Don&apos;t have an account?{' '}
        <Link
          href="/material-ui/getting-started/templates/sign-in/"
          variant="body2"
          sx={{ alignSelf: 'center' }}
        >
          Sign up
        </Link>
      </Typography>
    </Box>
  );
}

export default AuthProviderButtons;
