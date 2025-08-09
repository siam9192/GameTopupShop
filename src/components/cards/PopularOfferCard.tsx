import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import AlertDialog from '../ui/AleartDialog';

function PopularOfferCard() {
  return (
    <div className=" p-2 md:p-3 relative ">
      <Stack
        direction={{
          xs: 'column',
          md: 'row',
        }}
        spacing={2}
      >
        <Typography color="primary" fontSize={25} fontWeight={600}>
          1.
        </Typography>
        <Box>
          <img
            src="https://cdn-www.bluestacks.com/bs-images/FreeFire_Guide_DiamondsGuide_EN2.jpg"
            alt=""
            className=" size-20 rounded-lg"
          />
        </Box>
        <Stack spacing={0.5}>
          <Typography fontWeight={500} fontSize={20} color="text.primary">
            Free fire
          </Typography>
          <Typography
            fontSize={{
              xs: 14,
              lg: 16,
            }}
            fontWeight={500}
            color="text.secondary"
          >
            ID:
            <Typography
              fontSize={'inherit'}
              component={'span'}
              display={'inline'}
              fontWeight={500}
              color="success"
            >
              {' '}
              #873687333
            </Typography>
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
              Revenue: 2599922
            </Typography>
            <Typography
              fontSize={{
                xs: 14,
                lg: 16,
              }}
              fontWeight={500}
              color="text.secondary"
            >
              Order: 2000
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
                Active
              </Typography>
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack marginTop={1} direction={'row'} alignItems={'center'} justifyContent={'end'} gap={1}>
        <Stack direction={'row'} spacing={2}>
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
    </div>
  );
}

export default PopularOfferCard;
