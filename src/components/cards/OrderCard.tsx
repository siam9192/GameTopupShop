import { Avatar, Box, Button, Chip, Stack, Typography } from '@mui/material';
import React from 'react';
import AlertDialog from '../ui/AleartDialog';

function OrderCard() {
  return (
    <div className=" p-2 md:p-3 relative">
      <Stack
        direction={{
          xs: 'column',
          md: 'row',
        }}
        spacing={2}
      >
        <Box>
          <img
            src="https://play-lh.googleusercontent.com/Odw8BGugaJLdbaSbCeZWbTE3Qz1wTiQ0Tsn9nzpoQdnkzWb-gaI58zzTmYDvGpdYKg"
            alt=""
            className=" size-24 md:size-28 lg:size-32 rounded-lg"
          />
        </Box>

        <Stack flex={1} spacing={0.5}>
          <Typography fontWeight={500} fontSize={20} color="text.primary">
            Free fire- 25 Diamond
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
            <Typography
              fontSize={{
                xs: 14,
                lg: 16,
              }}
              fontWeight={500}
              color="text.secondary"
            >
              Date: {new Date().toDateString()}
            </Typography>
          </Stack>
          <Typography variant="h5" fontSize={20} fontWeight={500} color="secondary">
            <Typography component={'span'} fontSize={'inherit'} color="text.primary">
              Price :
            </Typography>{' '}
            $23
          </Typography>
          <Stack
            direction={'row'}
            marginTop={1}
            alignItems={'center'}
            justifyContent={'end'}
            gap={1}
          >
            <AlertDialog>
              <Button variant="outlined" className="w-fit " color="secondary">
                Details
              </Button>
            </AlertDialog>
            <AlertDialog>
              <Button variant="outlined" className="w-fit " color="warning">
                Cancel
              </Button>
            </AlertDialog>
          </Stack>
        </Stack>
      </Stack>

      {/* <Chip label={new Date().toDateString()} color='secondary' className='absolute top-1 right-1'/> */}
    </div>
  );
}

export default OrderCard;
