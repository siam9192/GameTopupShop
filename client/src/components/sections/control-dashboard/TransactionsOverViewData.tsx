import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import {
  HiOutlineCreditCard,
  HiOutlineCurrencyDollar,
  HiOutlineExclamationCircle,
  HiOutlineArrowTrendingDown,
} from 'react-icons/hi2';
import { MdPending, MdErrorOutline } from 'react-icons/md';
import { FaMoneyBillWave, FaRegCheckCircle } from 'react-icons/fa';

function TransactionsOverviewData() {
  const data = [
    {
      name: 'Transactions',
      icon: HiOutlineCreditCard,
      value: 7_523,
    },
    {
      name: 'Total Revenue',
      icon: FaMoneyBillWave,
      value: 245_000,
    },
    {
      name: 'Pending Transactions',
      icon: MdPending,
      value: 24_467,
    },
    {
      name: 'Failed Transactions',
      icon: MdErrorOutline,
      value: 12,
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

export default TransactionsOverviewData;
