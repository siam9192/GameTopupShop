'use client';
import { getUsersMetadataQuery } from '@/query/services/metadata';
import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { FaUserLock, FaUsers, FaUserTag } from 'react-icons/fa';
import { HiMiniUserGroup, HiOutlineWallet } from 'react-icons/hi2';
import { PiCurrencyDollarSimpleBold } from 'react-icons/pi';
import { RiAdminFill } from 'react-icons/ri';
import { TbRecharging } from 'react-icons/tb';

const defaultValue = 999;

function UsersOverviewData() {
  const { data: fetchData } = getUsersMetadataQuery();
  const data = fetchData?.data;
  const metadata = [
    {
      name: 'Total users',
      icon: FaUsers,
      value: data?.users ?? defaultValue,
    },
    {
      name: 'Customers',
      icon: FaUserTag,
      value: data?.customers ?? defaultValue,
    },
    {
      name: 'Administrators',
      icon: RiAdminFill,
      value: data?.administrators ?? defaultValue,
    },
    {
      name: 'Blocked',
      icon: FaUserLock,
      value: data?.blockedUsers ?? defaultValue,
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
        {metadata.map((_, index) => (
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

export default UsersOverviewData;
