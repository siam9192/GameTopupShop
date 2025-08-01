import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { HiOutlineWallet } from 'react-icons/hi2';
import { IoBagCheck } from 'react-icons/io5';
import { PiCurrencyDollarSimpleBold } from 'react-icons/pi';
import { TbRecharging } from 'react-icons/tb';

function WalletOverviewData() {
  const data = [
    {
      name: 'Available Balance',
      icon: HiOutlineWallet,
      value: 7523,
    },
    {
      name: 'Total Spend',
      icon: TbRecharging,
      value: 233,
    },
    {
      name: 'Last 30 days Spend',
      icon: IoBagCheck,
      value: 2398,
    },
  ];

  return (
    <div>
      <Grid
        container
        spacing={2}
        columns={{
          xs: 1,
          sm: 1,
          md: 3,
          lg: 3,
        }}
      >
        {data.map((_, index) => (
          <Grid size={1} key={index}>
            <div className=" glass shadow_1  p-3 md:p-5 rounded-lg min-h-52">
              <Typography fontWeight={600} fontSize={20} variant="caption" color="text.primary">
                {_.name}
              </Typography>
              <Stack
                marginTop={5}
                direction={'row'}
                gap={2}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <span>
                  <_.icon className="text-txt-primary  text-4xl md:text-6xl" />
                </span>
                <Typography
                  fontWeight={600}
                  align="center"
                  component={'h1'}
                  variant="h3"
                  fontSize={{
                    xs: 28,
                    sm: 30,
                    md: 40,
                  }}
                  color="secondary"
                  fontFamily={'jost'}
                >
                  {_.value.toLocaleString()}
                </Typography>
              </Stack>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default WalletOverviewData;
