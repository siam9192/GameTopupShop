import RecentOrderCard from '@/components/cards/RecentOrderCard';
import TopCustomerCard from '@/components/cards/TopCustomerCard';
import { Badge, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { TbRecharging } from 'react-icons/tb';

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
          Top Customers
        </Typography>
      </Stack>

      <Stack marginTop={2} spacing={2}>
        {Array.from({ length: 4 }).map((_, index) => (
          <TopCustomerCard key={index} />
        ))}
      </Stack>
    </Stack>
  );
}

export default TopCustomers;
