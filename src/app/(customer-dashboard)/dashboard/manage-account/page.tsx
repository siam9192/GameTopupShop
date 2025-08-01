import { Box, Button, FormControl, FormHelperText, Input, InputLabel, Stack, Typography } from '@mui/material';
import React from 'react';

function page() {
  return (
   <Box width={{ xs: '100%', lg: '80%' }} height={'100%'} >
      <Typography fontSize={20} fontWeight={600} color="text.primary" mb={2}>
        My Personal Information
      </Typography>

      <form>
        <Stack spacing={3} height={'100%'}>
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="firstName">First Name</InputLabel>
            <Input id="firstName" aria-describedby="firstName-text" />
          </FormControl>

          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="lastName">Last Name</InputLabel>
            <Input id="lastName" aria-describedby="lastName-text" />
          </FormControl>

          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="contactEmail">Contact Email</InputLabel>
            <Input id="contactEmail" aria-describedby="contactEmail-text" />
            <FormHelperText id="contactEmail-text">
              We’ll contact you on our update
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="favoriteGame">Favorite Game</InputLabel>
            <Input id="favoriteGame" aria-describedby="favoriteGame-text" />
          </FormControl>

          <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
            <Button variant="outlined" color="warning">Cancel</Button>
            <Button variant="contained" type="submit">Save Changes</Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
}

export default page;
