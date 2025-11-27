'use client';
import React from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { administratorSigninMutation, customerSigninMutation } from '@/query/services/auth';
import { SigninPayload } from '@/api-services/auth';
import { toast } from 'react-toastify';
import { useCurrentUser } from '@/provider/CurrentUserProvider';
import { useRouter } from 'next/navigation';

export default function DemoSignin() {
  const roles = [
    { label: 'Customer', value: 'customer', color: 'primary' },
    { label: 'Moderator', value: 'moderator', color: 'secondary' },
    { label: 'Admin', value: 'admin', color: 'warning' },
    { label: 'SuperAdmin', value: 'superadmin', color: 'error' },
  ];
  const { mutate: mutateCustomerSignin,isPending:cSigninPending } = customerSigninMutation();
  const { mutate: mutateAdministratorSignin,isPending:aSigninPending } = administratorSigninMutation();
  const router = useRouter();

  const { refetch } = useCurrentUser();

  const handleLogin = (role: string) => {
    let payload;
    switch (role) {
      case 'customer':
        payload = {
          email: 'customer1@gmail.com',
          password: '123456',
        };
        break;
      case 'moderator':
        payload = {
          email: 'moderator@gmail.com',
          password: '123456',
        };

        break;
      case 'admin':
        payload = {
          email: 'admin1@gmail.com',
          password: '123456',
        };
        break;

      case 'superadmin':
        payload = {
          email: 'superadmin@gmail.com',
          password: '654321',
        };
        break;
    }

    console.log(payload)

    if (role === 'customer') {
      mutateCustomerSignin(payload as SigninPayload, {
        onSuccess: data => {
          toast.success('Login successful');
          refetch();
          router.push('/dashboard');
        },
        onError: error => {
          toast.error(error.message);
        },
      });
    } else {
      mutateAdministratorSignin(payload as SigninPayload, {
        onSuccess: data => {
          toast.success('Login successful');
          refetch();
          router.push('/control-dashboard');
        },
        onError: error => {
          toast.error(error.message);
        },
      });
    }
  };


  const isPending = cSigninPending || aSigninPending
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography variant="h6" fontWeight={700} mb={3}>
          Demo Sign In
        </Typography>

        <Stack direction={'row'} flexWrap={'wrap'} gap={2}>
          {roles.map(role => (
            <Button
             disabled={isPending}
              key={role.value}
              variant="contained"
              color={role.color as any}
              sx={{ py: 1.2, borderRadius: 2 }}
              onClick={() => handleLogin(role.value)}
            >
              {role.label}
            </Button>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
