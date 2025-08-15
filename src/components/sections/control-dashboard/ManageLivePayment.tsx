import CustomJoditEditor from '@/components/editor/CustomJoditEditor';
import CustomQuillEditor from '@/components/editor/CustomQuillEditor';
import DashboardSectionHeading from '@/components/ui/DashboardSectionHeading';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
function ManageLivePayment() {
  const livePaymentMethods = [
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

  return (
    <Box>
      <Box></Box>
      <Box marginTop={3}>
        <Typography color="text.primary" fontSize={22} fontWeight={600} gutterBottom>
          Payment Methods :
        </Typography>
        <Grid container marginTop={2} spacing={2} columns={{ xs: 2, md: 3, lg: 4, xl: 5 }}>
          {livePaymentMethods.map(method => (
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

      <Box marginTop={3}>
        <DashboardSectionHeading title="Write Live Payment Description Here.." />
        <Box marginTop={1}>
          <CustomJoditEditor />
        </Box>
      </Box>
    </Box>
  );
}

export default ManageLivePayment;
