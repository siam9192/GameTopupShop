import CustomJoditEditor from '@/components/editor/CustomJoditEditor';
import ManualPaymentForm from '@/components/forms/ManualPaymentAddMoneySubmissionForm';
import DashboardSectionHeading from '@/components/ui/DashboardSectionHeading';
import { Box, Chip, Stack, Typography } from '@mui/material';
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

function ManageManualPayment() {
  return (
    <Box>
      <Box marginTop={3}>
        <Typography color="text.primary" fontSize={22} fontWeight={600} gutterBottom>
          Payment Methods :
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
        <DashboardSectionHeading title="Write Live Payment Description Here.." />
        <Box marginTop={1}>{/* <CustomJoditEditor /> */}</Box>
      </Box>
    </Box>
  );
}

export default ManageManualPayment;
