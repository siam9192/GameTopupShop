'use client';
import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

const directPaymentMethods = [
  {
    name: 'Bkash',
    logo: 'https://freelogopng.com/images/all_img/1656235199bkash-logo-transparent.png',
    numbers: ['018365369038', '0193763733'],
  },
  {
    name: 'Nagad',
    logo: 'https://freelogopng.com/images/all_img/1679248787Nagad-Logo.png',
    numbers: ['018365369038', '0193763733'],
  },
  {
    name: 'Rocket',
    logo: 'https://milvikbd.com/wp-content/uploads/2024/06/ROCKET.png',
    numbers: ['018365369038', '0193763733'],
  },
];

function DirectPaymentForm() {
  const [selectedMethod, setSelectedMethod] = useState(0);
  return (
    <Stack spacing={3}>
      <Typography color="text.primary" fontSize={22} fontWeight={600} gutterBottom>
        Choose Method:
      </Typography>
      <Grid container columns={{ xs: 3, md: 4, lg: 5, xl: 6 }} spacing={2}>
        {directPaymentMethods.map((method, index) => (
          <Grid size={1} key={method.name}>
            <div
              onClick={() => setSelectedMethod(index)}
              className={`p-2 ${selectedMethod === index ? 'border-2 border-secondary' : ''} hover:cursor-pointer   rounded-lg  `}
            >
              <img src={method.logo} alt="" />
            </div>
          </Grid>
        ))}
      </Grid>
      <TextField fullWidth id="outlined-search" label={'Amount'} type="number" />

      <Button variant="outlined" size="large">
        Submit
      </Button>
    </Stack>
  );
}

export default DirectPaymentForm;
