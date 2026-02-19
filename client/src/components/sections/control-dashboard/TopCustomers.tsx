import TopCustomerCard from '@/components/cards/TopCustomerCard';
import { TopCustomer } from '@/types/customer.type';
import { Divider, Stack, Typography } from '@mui/material';
import React, { Fragment } from 'react';

const topCustomers: TopCustomer[] = [
  {
    rank: 1,
    name: 'Ariana Rahman',
    profilePicture: 'https://randomuser.me/api/portraits/women/44.jpg',
    point: 9820,
  },
  {
    rank: 2,
    name: 'Fahim Chowdhury',
    profilePicture: 'https://randomuser.me/api/portraits/men/33.jpg',
    point: 8765,
  },
  {
    rank: 3,
    name: 'Mehedi Hasan',
    profilePicture: 'https://randomuser.me/api/portraits/men/18.jpg',
    point: 8340,
  },
  {
    rank: 4,
    name: 'Ritu Akter',
    profilePicture: 'https://randomuser.me/api/portraits/women/29.jpg',
    point: 7920,
  },
  {
    rank: 5,
    name: 'Tanvir Alam',
    profilePicture: 'https://randomuser.me/api/portraits/men/55.jpg',
    point: 7580,
  },
];

function TopCustomers() {
  return (
    <Stack className="glass p-3 md:p-5 h-full  ">
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography
          component={'h1'}
          variant="h5"
          fontFamily={'jost'}
          fontWeight={600}
          color="text.primary"
        >
          Top Customers (Demo)
        </Typography>
      </Stack>

      <Stack marginTop={2} spacing={2}>
        {topCustomers.map((_, index) => (
          <Fragment key={index}>
            {index !== 0 ? <Divider /> : null}
            <TopCustomerCard customer={_} />
          </Fragment>
        ))}
      </Stack>
    </Stack>
  );
}

export default TopCustomers;
