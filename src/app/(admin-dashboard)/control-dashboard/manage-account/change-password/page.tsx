'use client';
import { changePasswordMutation } from '@/query/services/auth';
import authValidations from '@/validations/auth.validation';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Page() {
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    logoutOtherDevices: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const { mutate, isPending } = changePasswordMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = authValidations.changePasswordValidation.safeParse(form);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach(err => {
        const fieldName = err.path.join('.');
        fieldErrors[fieldName] = err.message;
      });

      setErrors(fieldErrors);
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: 'Passwords do not match.',
      }));
      return;
    }

    const toastId = toast.loading('Changing password...');

    mutate(form, {
      onSuccess: data => {
        toast.dismiss(toastId);
        toast.success(data.message);
        setForm({
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
          logoutOtherDevices: true,
        });
      },
      onError: error => {
        toast.dismiss(toastId);
        toast.error(error.message);
      },
    });
  };

  return (
    <Box width={{ xs: '100%', lg: '80%' }} height={'100%'}>
      <Typography fontSize={20} fontWeight={600} color="text.primary" mb={2}>
        Change Password
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* Old Password */}
          <FormControl fullWidth variant="standard" error={!!errors.oldPassword}>
            <InputLabel htmlFor="oldPassword">Old Password</InputLabel>
            <Input
              id="oldPassword"
              name="oldPassword"
              type={showPassword.old ? 'text' : 'password'}
              value={form.oldPassword}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility('old')}
                    edge="end"
                    aria-label="toggle old password visibility"
                  >
                    {showPassword.old ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errors.oldPassword && <FormHelperText error>{errors.oldPassword}</FormHelperText>}
          </FormControl>

          {/* New Password */}
          <FormControl fullWidth variant="standard" error={!!errors.newPassword}>
            <InputLabel htmlFor="newPassword">New Password</InputLabel>
            <Input
              id="newPassword"
              name="newPassword"
              type={showPassword.new ? 'text' : 'password'}
              value={form.newPassword}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility('new')}
                    edge="end"
                    aria-label="toggle new password visibility"
                  >
                    {showPassword.new ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errors.newPassword && <FormHelperText error>{errors.newPassword}</FormHelperText>}
          </FormControl>

          {/* Confirm Password */}
          <FormControl fullWidth variant="standard" error={!!errors.confirmPassword}>
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword.confirm ? 'text' : 'password'}
              value={form.confirmPassword}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility('confirm')}
                    edge="end"
                    aria-label="toggle confirm password visibility"
                  >
                    {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errors.confirmPassword && (
              <FormHelperText error>{errors.confirmPassword}</FormHelperText>
            )}
          </FormControl>

          {/* Logout from other devices */}
          <FormControl fullWidth variant="standard">
            <FormControlLabel
              control={
                <Checkbox
                  name="logoutOtherDevices"
                  checked={form.logoutOtherDevices}
                  onChange={handleChange}
                />
              }
              label="Logout from other devices"
              sx={{ color: 'text.primary' }}
            />
          </FormControl>

          {/* Buttons */}
          <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
            <Button disabled={isPending} variant="outlined" color="warning" type="button">
              Cancel
            </Button>
            <Button disabled={isPending} variant="contained" type="submit">
              Change Password
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
}

export default Page;
