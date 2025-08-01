import WalletHistoryCard from '@/components/cards/WalletHistoryCard';
import { Badge, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { AiOutlineHistory } from 'react-icons/ai';

function RecentWalletHistories() {
  return (
    <Stack direction={'column'} className="glass p-3 md:p-5 h-full  ">
      <div className="grow">
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography
            component={'h1'}
            variant="h5"
            fontFamily={'jost'}
            fontWeight={600}
            color="text.primary"
          >
            Recent Wallet Histories
          </Typography>
          <Badge color="secondary" badgeContent={10} variant="standard">
            <AiOutlineHistory className="text-txt-primary" size={28} />
          </Badge>
        </Stack>

        <Stack marginTop={2} spacing={2}>
          {Array.from({ length: 6 }).map((_, index) => (
            <WalletHistoryCard key={index} />
          ))}
        </Stack>
      </div>
      <Button variant="outlined" size="large">
        See All
      </Button>
    </Stack>
  );
}

export default RecentWalletHistories;
