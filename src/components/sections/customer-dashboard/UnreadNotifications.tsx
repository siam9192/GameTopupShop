'use client';

import React, { Fragment } from 'react';

import { Badge, CircularProgress, Divider, Stack, Typography } from '@mui/material';

import UnReadNotificationCard from '@/components/cards/UnReadNotificationCard';
import { getMyUnreadNotificationQuery } from '@/query/services/notification';
import { TbRecharging } from 'react-icons/tb';
function UnreadNotifications() {
  const { data, isLoading } = getMyUnreadNotificationQuery([]);
  const notifications = data?.data;
  const meta = data?.meta;
  return (
    <Stack className="glass p-3 md:p-5 h-full  min-h-[400px] ">
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
        <Badge color="secondary" badgeContent={meta?.totalResults || 0} variant="standard">
          <TbRecharging className="text-txt-primary" size={28} />
        </Badge>
      </Stack>

      {isLoading ? <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} /> : null}

      {meta?.totalResults === 0 && (
        <Typography variant="h5" color="text.primary" align="center">
          No unread Notifications
        </Typography>
      )}

      <Stack marginTop={2} spacing={2}>
        {notifications?.map((_, index) => (
          <Fragment key={index}>
            {index !== 0 ? <Divider /> : null}
            <UnReadNotificationCard notification={_} key={index} />
          </Fragment>
        ))}
      </Stack>
    </Stack>
  );
}

export default UnreadNotifications;
