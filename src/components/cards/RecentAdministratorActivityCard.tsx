import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import AlertDialog from '../ui/AleartDialog';

function RecentAdministratorActivityCard() {
  return (
    <div className=" p-2 md:p-3 relative">
      <Stack>
        <Box></Box>
        <Stack spacing={0.5}>
          <Typography fontWeight={500} fontSize={20} color="text.primary">
            Blocked Customer 1233
          </Typography>
          <Stack
            marginTop={2}
            direction={'row'}
            alignItems={'center'}
            spacing={{
              xs: 1,
              md: 2,
            }}
          >
            <Typography
              fontWeight={500}
              fontSize={{
                xs: 14,
                lg: 16,
              }}
              color="text.secondary"
            >
              Action: Delete
            </Typography>

            <Typography
              fontSize={{
                xs: 14,
                lg: 16,
              }}
              fontWeight={500}
              color="text.secondary"
            >
              Category: Order
            </Typography>
            <Typography
              fontSize={{
                xs: 14,
                lg: 16,
              }}
              fontWeight={500}
              color="text.secondary"
            >
              Trigged At:
              <Typography
                fontSize={'inherit'}
                component={'span'}
                display={'inline'}
                fontWeight={500}
                color="info"
              >
                {' '}
                {new Date().toDateString()} - {new Date().toLocaleTimeString()}
              </Typography>
            </Typography>
          </Stack>
          <Stack
            marginTop={2}
            direction={'row'}
            alignItems={'center'}
            spacing={{
              xs: 1,
              md: 2,
            }}
          >
            <Typography
              fontWeight={500}
              fontSize={{
                xs: 14,
                lg: 16,
              }}
              color="text.secondary"
            >
              Name : Md.Rafi Ahmed
            </Typography>
            <Typography
              fontWeight={500}
              fontSize={{
                xs: 14,
                lg: 16,
              }}
              color="text.secondary"
            >
              Role : Admin
            </Typography>
            <Typography
              fontSize={{
                xs: 14,
                lg: 16,
              }}
              fontWeight={500}
              color="text.secondary"
            >
              ID: #87783678393896
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack direction={'row'} justifyContent={'end'}>
        <AlertDialog>
          <Button variant="outlined" className="w-fit " color="secondary">
            Details
          </Button>
        </AlertDialog>
      </Stack>

      <p className="text-primary font-medium absolute right-1 top-0 ">2Hrs</p>
    </div>
  );
}

export default RecentAdministratorActivityCard;
