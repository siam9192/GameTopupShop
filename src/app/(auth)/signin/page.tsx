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
import { getFormData } from '@/utils/helper';

import { SigninPayload } from '@/api-services/auth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { customerSigninMutation } from '@/query/services/auth';
import AuthProviderButtons from '@/components/ui/AuthProviderButtons';
import ToggleThemeMode from '@/components/ui/ToggleThemeMode';
import { useCurrentUser } from '@/provider/CurrentUserProvider';
import DemoSignin from '@/components/ui/DemoSignin';
const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100dvh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),

  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },

  position: "relative",
  overflow: "hidden",

  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    zIndex: -1,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",

    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

const Card = styled(MuiCard)(({ theme }) => ({
  width: "100%",
  maxWidth: "450px",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  borderRadius: "18px",

  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",

  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));


export default function SignIn() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const [errorMessage, setErrorMessage] = React.useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const { mutate } = customerSigninMutation();
  const router = useRouter();
  const { refetch } = useCurrentUser();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setErrorMessage('');
    event.preventDefault();
    const data = getFormData(['email', 'password'], event.currentTarget);

    const { email, password } = data;

    let isValid = true;
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

    if (!isValid) return;
    event.currentTarget.reset();
    mutate(
      {
        email,
        password,
      } as SigninPayload,
      {
        onSuccess: data => {
          toast.success('Login successful');
          refetch();
          router.push('/dashboard');
        },
        onError: error => {
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
        className="transition-all duration-300 rounded-2xl"
        sx={{
          borderRadius: '18px',
          backdropFilter: 'blur(6px)',
          border: theme => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          fontWeight={700}
          textAlign="center"
          sx={{
            width: '100%',
            mb: 1,
            fontSize: 'clamp(2rem, 10vw, 2.2rem)',
            background: 'linear-gradient(to right, #5b8cff, #7f56d9)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Welcome Back
        </Typography>

        <Typography variant="body1" textAlign="center" sx={{ color: 'text.secondary', mb: 2 }}>
          Sign in to continue
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
            mt: 1,
          }}
        >
          {/* Email */}
          <FormControl>
            <FormLabel htmlFor="email" sx={{ fontWeight: 600 }}>
              Email Address
            </FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              fullWidth
              variant="outlined"
              sx={{
                borderRadius: '10px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                },
              }}
            />
          </FormControl>

          {/* Password */}
          <FormControl>
            <FormLabel htmlFor="password" sx={{ fontWeight: 600 }}>
              Password
            </FormLabel>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              fullWidth
              variant="outlined"
              sx={{
                borderRadius: '10px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                },
              }}
            />
          </FormControl>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{
                fontWeight: 600,
                color: 'primary.main',
                textTransform: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Forgot password?
            </Link>
          </Stack>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              mt: 0.5,
              py: 1.4,
              fontSize: '1rem',
              borderRadius: '10px',
              fontWeight: 600,
              textTransform: 'none',
              background: 'linear-gradient(90deg, #4facfe 0%, #4f86fe 100%)',
              boxShadow: '0 4px 14px rgba(79, 132, 254, .3)',
              transition: '0.3s',
              '&:hover': {
                background: 'linear-gradient(90deg, #4f86fe 0%, #4facfe 100%)',
                boxShadow: '0 6px 20px rgba(79, 132, 254, .4)',
              },
            }}
          >
            Sign In
          </Button>

          {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
        </Box>

        <Divider sx={{ my: 2 }}>or continue with</Divider>

        <AuthProviderButtons />

        <Typography sx={{ textAlign: 'center', mt: 1, color: 'text.secondary' }}>
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            variant="body2"
            sx={{
              fontWeight: 600,
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Create one
          </Link>
        </Typography>

        <DemoSignin />
        <div className="size-fit absolute right-2 top-2">
          <ToggleThemeMode />
        </div>
      </Card>
    </SignInContainer>
  );
}
