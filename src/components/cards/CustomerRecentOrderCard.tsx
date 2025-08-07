import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import AlertDialog from '../ui/AleartDialog';

function CustomerRecentOrderCard() {
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
          <Typography fontWeight={500} fontSize={20} color="text.primary">
            Free fire
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
              Recharge: 25 Diamond
            </Typography>
            <Typography
              fontSize={{
                xs: 14,
                lg: 16,
              }}
              fontWeight={500}
              color="text.secondary"
            >
              Quantity: $23
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
                Success
              </Typography>
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={1}>
        <Typography variant="h5" fontSize={25} fontWeight={500} color="secondary">
          $23
        </Typography>
        <AlertDialog>
          <Button variant="outlined" className="w-fit " color="warning">
            Cancel
          </Button>
        </AlertDialog>
      </Stack>

      <p className="text-primary font-medium absolute right-1 top-0 ">2Hrs</p>
    </div>
  );
}

export default CustomerRecentOrderCard;
