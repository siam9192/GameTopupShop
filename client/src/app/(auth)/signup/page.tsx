'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';

import AuthProviderButtons from '@/components/ui/AuthProviderButtons';
import { customerSignupMutation } from '@/query/services/auth';
import { getFormData } from '@/utils/helper';
import { CustomerSignupPayload } from '@/api-services/auth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import ToggleThemeMode from '@/components/ui/ToggleThemeMode';
import { Grid } from '@mui/material';

const Card = styled(MuiCard)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('md')]: {
    maxWidth: '800px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',

  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignIn() {
  const [firstNameError, setFirstNameError] = React.useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = React.useState('');
  const [lastNameError, setLastNameError] = React.useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const { mutate } = customerSignupMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setSuccessMessage('');
    setErrorMessage('');
    event.preventDefault();

    const data = getFormData(
      ['firstName', 'lastName', 'email', 'password', 'confirmPassword'],
      event.currentTarget,
    );
    console.log(data);
    const { firstName, lastName, email, password, confirmPassword } = data;

    let isValid = true;

    // First name validation
    if (!firstName || firstName.trim().length < 3 || firstName.trim().length > 20) {
      setFirstNameError(true);
      setFirstNameErrorMessage('First name is required (3–20 characters)');
      isValid = false;
    } else {
      setFirstNameError(false);
      setFirstNameErrorMessage('');
    }

    // Last name validation
    if (!lastName || lastName.trim().length < 3 || lastName.trim().length > 20) {
      setLastNameError(true);
      setLastNameErrorMessage('Last name is required (3–20 characters)');
      isValid = false;
    } else {
      setLastNameError(false);
      setLastNameErrorMessage('');
    }

    // Email validation (basic regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Enter a valid email address');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    // Password validation
    if (!password || password.length < 6 || password.length > 20) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be 6–20 characters');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage('');
    }

    if (!isValid) return;
    mutate(
      {
        name: {
          first: firstName,
          last: lastName,
        },
        email,
        password,
      } as CustomerSignupPayload,
      {
        onSuccess: data => {
          event.currentTarget.reset();
          toast.success('Account registration successful');
          router.push('/signin');
        },
        onError: error => {
          console.log(error);
          setErrorMessage(error.message);
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <SignInContainer>
      <Card
        variant="outlined"
        sx={{
          borderRadius: '18px',
          backdropFilter: 'blur(6px)',
          border: theme => `1px solid ${theme.palette.divider}`,
          p: 4,
          transition: '0.3s ease',
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          fontFamily="jost"
          fontWeight={700}
          textAlign="center"
          sx={{
            width: '100%',
            fontSize: 'clamp(2rem, 10vw, 2.3rem)',
            mb: 1,
            background: 'linear-gradient(to right, #4f86ff, #7f56d9)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Create Your Account
        </Typography>

        <Typography variant="body1" textAlign="center" sx={{ color: 'text.secondary', mb: 2 }}>
          Start your journey with us
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '100%',
          }}
        >
          <Grid container columns={2} spacing={3}>
            <Grid size={1}>
              {/* First Name */}
              <FormControl fullWidth>
                <FormLabel sx={{ fontWeight: 600 }} htmlFor="firstName">
                  First Name
                </FormLabel>
                <TextField
                  error={firstNameError}
                  helperText={firstNameErrorMessage}
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  required
                  fullWidth
                  variant="outlined"
                  sx={{
                    mt: 0.5,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                    },
                  }}
                />
              </FormControl>
            </Grid>

            <Grid size={1}>
              {/* Last Name */}
              <FormControl fullWidth>
                <FormLabel sx={{ fontWeight: 600 }} htmlFor="lastName">
                  Last Name
                </FormLabel>
                <TextField
                  error={lastNameError}
                  helperText={lastNameErrorMessage}
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  required
                  fullWidth
                  variant="outlined"
                  sx={{
                    mt: 0.5,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                    },
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>

          {/* Email */}
          <FormControl>
            <FormLabel sx={{ fontWeight: 600 }} htmlFor="email">
              Email Address
            </FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              fullWidth
              variant="outlined"
              sx={{
                mt: 0.5,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                },
              }}
            />
          </FormControl>

          <Grid container columns={2} spacing={3}>
            <Grid size={1}>
              {/* Password */}
              <FormControl fullWidth>
                <FormLabel sx={{ fontWeight: 600 }} htmlFor="password">
                  Password
                </FormLabel>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  fullWidth
                  variant="outlined"
                  sx={{
                    mt: 0.5,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                    },
                  }}
                />
              </FormControl>
            </Grid>
            <Grid size={1}>
              {/* Confirm Password */}
              <FormControl fullWidth>
                <FormLabel sx={{ fontWeight: 600 }} htmlFor="confirmPassword">
                  Confirm Password
                </FormLabel>
                <TextField
                  error={confirmPasswordError}
                  helperText={confirmPasswordErrorMessage}
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  fullWidth
                  variant="outlined"
                  sx={{
                    mt: 0.5,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                    },
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>

          <FormControlLabel
            control={<Checkbox onChange={e => setShowPassword(e.target.checked)} color="primary" />}
            label="Show Password"
          />

          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            sx={{
              py: 1.4,
              mt: 1,
              borderRadius: '10px',
              fontWeight: 600,
              textTransform: 'none',
              background: 'linear-gradient(90deg, #4f86fe, #4facfe)',
              boxShadow: '0 4px 14px rgba(79, 132, 254, 0.3)',
              transition: '0.3s ease',
              '&:hover': {
                background: 'linear-gradient(90deg, #4facfe, #4f86fe)',
                boxShadow: '0 6px 20px rgba(79, 132, 254, 0.45)',
              },
            }}
          >
            Sign Up
          </Button>

          {errorMessage && (
            <Typography color="error" sx={{ fontSize: '.9rem' }}>
              {errorMessage}
            </Typography>
          )}
          {successMessage && (
            <Typography color="success.main" sx={{ fontSize: '.9rem' }}>
              {successMessage}
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 2 }}>or</Divider>

        <AuthProviderButtons />

        <Typography sx={{ textAlign: 'center', mt: 2 }}>
          Already have an account?{' '}
          <Link
            href="/signin"
            variant="body2"
            sx={{
              fontWeight: 600,
              color: 'primary.main',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Sign In
          </Link>
        </Typography>
        <div className="size-fit absolute right-2 top-2">
          <ToggleThemeMode />
        </div>
      </Card>
    </SignInContainer>
  );
}
