import DirectPaymentForm from '@/components/forms/DirectPaymentForm';
import ManualPaymentForm from '@/components/forms/ManualPaymentForm';
import {
  Box,
  Chip,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

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

function DirectPayment() {
  return (
    <Box>
      <Box>
        <Typography color="text.primary" fontSize={22} fontWeight={600} gutterBottom>
          Make Direct Payment
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
          Payment Methods :
        </Typography>
        <Grid container marginTop={2} spacing={2} columns={{ xs: 2, md: 3, lg: 4, xl: 5 }}>
          {directPaymentMethods.map(method => (
            <Grid key={method.name} size={1}>
              <div className="p-5 border-secondary border-2 rounded-lg">
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
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          width: {
            xs: '100%',
            md: '80%',
            lg: '50%',
          },
          marginX: 'auto',
          marginTop: 3,
        }}
      >
        <DirectPaymentForm />
      </Box>
    </Box>
  );
}

export default DirectPayment;
