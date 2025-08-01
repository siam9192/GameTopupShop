import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

const manualPaymentMethods = [
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

function ManualPaymentForm() {
  const [selectedMethod, setSelectedMethod] = useState(manualPaymentMethods[0].name);
  return (
    <Stack
      spacing={2}
      width={{
        xs: '100%',
        md: '80%',
        lg: '50%',
      }}
      marginX={'auto'}
      marginTop={2}
    >
      <TextField fullWidth id="outlined-search" label={'Phone Number'} type="text" />
      <Select
        labelId="demo-simple-select-label"
        value={selectedMethod}
        onChange={e => setSelectedMethod(e.target.value)}
        id="demo-simple-select"
      >
        {manualPaymentMethods.map(method => (
          <MenuItem value={method.name}>{method.name}</MenuItem>
        ))}
      </Select>
      <TextField fullWidth id="outlined-search" label={'Transaction ID'} type="text" />
      <TextField fullWidth id="outlined-search" label={'Amount'} type="text" />
      <Button variant="outlined" size="large">
        Submit
      </Button>
    </Stack>
  );
}

export default ManualPaymentForm;
