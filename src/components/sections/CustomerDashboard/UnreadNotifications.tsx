import React from 'react';

import { Badge, Stack, Typography } from '@mui/material';

import { HiOutlineBellAlert } from 'react-icons/hi2';
import UnReadNotificationCard from '@/components/cards/UnReadNotificationCard';
function UnreadNotifications() {
  return (
    <Stack className="glass p-3 md:p-5   h-full">
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography
          component={'h1'}
          variant="h5"
          fontFamily={'jost'}
          fontWeight={600}
          color="text.primary"
        >
          Unread Notifications
        </Typography>
        <Badge color="info" badgeContent={10} variant="standard">
          <HiOutlineBellAlert className="text-txt-primary" size={28} />
        </Badge>
      </Stack>

      <Stack marginTop={2} spacing={2}>
        {Array.from({ length: 6 }).map((_, index) => (
          <UnReadNotificationCard key={index} />
        ))}
      </Stack>
    </Stack>
  );
}

export default UnreadNotifications;
