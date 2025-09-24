import RecentAddBalanceSubmissionCard from '@/components/cards/RecentAddBalanceSubmissionCard';
import { Badge, Stack, Typography } from '@mui/material';
import React from 'react';
import { TbRecharging } from 'react-icons/tb';

function RecentAddBalanceSubmissions() {
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
          Recent Add Submissions
        </Typography>
        <Badge color="secondary" badgeContent={10} variant="standard">
          <TbRecharging className="text-txt-primary" size={28} />
        </Badge>
      </Stack>

      <Stack marginTop={2} spacing={2}>
        {Array.from({ length: 6 }).map((_, index) => (
          <RecentAddBalanceSubmissionCard key={index} />
        ))}
      </Stack>
    </Stack>
  );
}

export default RecentAddBalanceSubmissions;
