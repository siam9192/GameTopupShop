import PopularOfferCard from '@/components/cards/PopularOfferCard';
import RecentOrderCard from '@/components/cards/RecentOrderCard';
import DashboardSectionHeading from '@/components/ui/DashboardSectionHeading';
import { Badge, Stack } from '@mui/material';
import React from 'react';
import { TbRecharging } from 'react-icons/tb';

function PopularOffers() {
  return (
    <Stack className="glass  p-3 md:p-5 h-full  ">
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <DashboardSectionHeading title="Popular Top Offers" />
        <Badge color="secondary" badgeContent={10} variant="standard">
          <TbRecharging className="text-txt-primary" size={28} />
        </Badge>
      </Stack>

      <Stack marginTop={2} spacing={2}>
        {Array.from({ length: 6 }).map((_, index) => (
          <PopularOfferCard key={index} />
        ))}
      </Stack>
    </Stack>
  );
}

export default PopularOffers;
