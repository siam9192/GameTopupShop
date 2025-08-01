import { Button, Stack, Typography } from '@mui/material';
import React from 'react';

function WalletHistoryCard() {
  return (
    <div className=" p-2 md:p-3 relative">
      <Stack spacing={0.5}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={1}>
          <Typography fontWeight={500} fontSize={20} color="text.primary">
            Game Topup
          </Typography>
          <Typography
            variant="h5"
            fontSize={{
              xs: 20,
              md: 24,
              lg: 26,
            }}
            fontWeight={500}
            color="red"
          >
            -$23
          </Typography>
        </Stack>
        <Typography fontSize={16} fontWeight={500} color="secondary">
          {new Date().toDateString()} {new Date().toLocaleTimeString()}
        </Typography>
      </Stack>
    </div>
  );
}

export default WalletHistoryCard;
