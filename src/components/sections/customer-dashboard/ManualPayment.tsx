import ManualPaymentForm from '@/components/forms/ManualPaymentForm';
import {
  Box,
  Chip,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

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

function ManualPayment() {
  return (
    <Box>
      <Box>
        <Typography color="text.primary" fontSize={22} fontWeight={600} gutterBottom>
          Make Manual Payment
        </Typography>

        <Typography color="text.secondary" fontSize={16} lineHeight={1.7}>
          At Campers Show, our mission is to ignite the spirit of adventure and connect outdoor
          enthusiasts with the perfect gear and information to make their camping experiences
          unforgettable. We believe that nature is not just a place to visit, but a home to cherish
          and protect. Camping is a powerful way to foster this connection.
        </Typography>
      </Box>
      <Box marginTop={3}>
        <Typography color="text.primary" fontSize={22} fontWeight={600} gutterBottom>
          Mobile Banking Methods :
        </Typography>
        <Stack
          marginTop={2}
          direction={{
            xs: 'column',
            md: 'row',
          }}
          spacing={3}
        >
          {manualPaymentMethods.map(method => (
            <div className="py-5 px-10 border-secondary border-2 rounded-lg" key={method.name}>
              <img src={method.logo} alt="" className=" size-28 md:size-32 lg:size-40 mx-auto" />
              <Typography
                marginTop={1}
                color="secondary"
                align="center"
                fontSize={16}
                fontWeight={600}
                gutterBottom
              >
                {method.name}
              </Typography>
              <Stack direction={'column'} spacing={1}>
                {method.numbers.map((number, index) => (
                  <Chip variant="outlined" className="font-medium" key={index} label={number} />
                ))}
              </Stack>
            </div>
          ))}
        </Stack>
      </Box>
      <Box marginTop={3}>
        <Typography color="text.primary" fontSize={22} fontWeight={600} gutterBottom>
          Fill The Form :
        </Typography>
        <ManualPaymentForm />
      </Box>
    </Box>
  );
}

export default ManualPayment;
