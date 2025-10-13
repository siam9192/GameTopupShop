import { Box, Grid, Icon, Stack, Typography } from '@mui/material';
import React from 'react';
import { HiMiniUserGroup, HiOutlineWallet } from 'react-icons/hi2';
import { PiCurrencyDollarSimpleBold } from 'react-icons/pi';
import { TbRecharging } from 'react-icons/tb';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
function AllOverviewData() {
  const data = [
    {
      name: 'Total Products',
      icon: HiOutlineWallet,
      value: 7523,
    },
    {
      name: 'Total Orders',
      icon: TbRecharging,
      value: 2,
    },
    {
      name: 'Total Revenue',
      icon: PiCurrencyDollarSimpleBold,
      value: 24467,
    },
    {
      name: 'Total Customers',
      icon: HiMiniUserGroup,
      value: 2,
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
          md: 2,
          lg: 4,
        }}
      >
        {data.map((_, index) => {
          const value = 100;
          const isPositive = value >= 0;
          const Icon = isPositive ? ArrowUpwardIcon : ArrowDownwardIcon;
          const color = isPositive ? '#16C47F' : '#F93827';

          return (
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
                <Box display="flex" alignItems="center" marginTop={1} gap={0.5}>
                  <Icon sx={{ fontSize: 18, color }} />
                  <Typography variant="body2" fontWeight={600} color={color}>
                    {isPositive ? `+${value}%` : `${value}%`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    than prev month
                  </Typography>
                </Box>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default AllOverviewData;
