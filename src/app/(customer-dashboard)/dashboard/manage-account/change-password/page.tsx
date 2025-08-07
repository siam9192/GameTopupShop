import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  InputLabel,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';

function page() {
  return (
    <Box width={{ xs: '100%', lg: '80%' }} height={'100%'}>
      <Typography fontSize={20} fontWeight={600} color="text.primary" mb={2}>
        Change Password
      </Typography>

      <form>
        <Stack spacing={3} height={'100%'}>
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="oldPassword">Old Password</InputLabel>
            <Input id="oldPassword" />
          </FormControl>

          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="newPassword">New Password</InputLabel>
            <Input id="newPassword" aria-describedby="lastName-text" />
          </FormControl>

          <FormControl fullWidth variant="standard">
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              sx={{
                color: 'text.primary',
              }}
              label="Logout from other devices "
            />
          </FormControl>

          <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
            <Button variant="outlined" color="warning">
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Change Password
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
}

export default page;
