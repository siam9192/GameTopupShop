import React from 'react';
import { Button, Chip, Stack, Typography, Divider, Paper } from '@mui/material';
import AlertDialog from '../ui/AleartDialog';

function RecentAddBalanceSubmissionCard() {
  return (
    <div className=" p-2 md:p-3 relative">
      <Stack
        direction={{
          xs: 'column',
          md: 'row',
        }}
        spacing={2}
      >
        <Stack spacing={0.5}>
          <Typography variant="h5" fontSize={20} fontWeight={500} color="secondary">
            Amount: $23
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
              Method: Bkash
            </Typography>
            <Typography
              fontSize={{
                xs: 14,
                lg: 16,
              }}
              fontWeight={500}
              color="text.secondary"
            >
              Trx ID: 38786kjschbkjcbc
            </Typography>
            <Typography
              fontSize={{
                xs: 14,
                lg: 16,
              }}
              fontWeight={500}
              color="text.secondary"
            >
              Status:
              <Typography
                fontSize={'inherit'}
                component={'span'}
                display={'inline'}
                fontWeight={500}
                color="success"
              >
                {' '}
                Fulfilled
              </Typography>
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack marginTop={1} direction={'row'} alignItems={'center'} justifyContent={'end'} gap={1}>
        <AlertDialog>
          <Button variant="outlined" className="w-fit " color="info">
            Details
          </Button>
        </AlertDialog>
      </Stack>

      <p className="text-primary font-medium absolute right-1 top-0 ">2Hrs</p>
    </div>
  );
}

export default RecentAddBalanceSubmissionCard;
