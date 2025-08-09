import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import AlertDialog from '../ui/AleartDialog';

function RecentUserCard() {
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
            src="https://wallpapers.com/images/hd/cool-neon-blue-profile-picture-u9y9ydo971k9mdcf.jpg"
            alt=""
            className="size-20 object-cover rounded-lg"
          />
        </Box>
        <Stack spacing={0.5}>
          <Typography fontWeight={500} fontSize={20} color="text.primary">
            Md. Ashikur Rahman
          </Typography>

          <Stack
            marginTop={2}
            direction={'row'}
            alignItems={{
              xs: 'start',
              md: 'center',
            }}
            flexWrap={'wrap'}
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
              Role:
              <Typography
                fontSize={'inherit'}
                component={'span'}
                display={'inline'}
                fontWeight={500}
                color="info"
              >
                {' '}
                Customer
              </Typography>
            </Typography>

            <Typography
              fontWeight={500}
              fontSize={{
                xs: 14,
                lg: 16,
              }}
              color="text.secondary"
            >
              Signup Method : Google
            </Typography>
            <Typography
              fontSize={{
                xs: 14,
                lg: 16,
              }}
              fontWeight={500}
              color="text.secondary"
            >
              Date:
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

export default RecentUserCard;
