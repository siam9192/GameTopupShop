'use client';
import { notificationSetAsReadMutation } from '@/query/services/notification';
import { Notification } from '@/types/notification.type';
import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { FiBell } from 'react-icons/fi';
import { toast } from 'react-toastify';
interface Props {
  notification: Notification;
}
function UnReadNotificationCard({ notification }: Props) {
  const { mutate, isPending } = notificationSetAsReadMutation();
  const handelSetAsRead = () => {
    mutate(
      {
        ids: [notification._id],
      },
      {
        onSuccess: data => {
          toast.success(data.message);
        },
        onError: data => {
          toast.error(data.message);
        },
      },
    );
  };
  return (
    <div className=" p-2">
      <Stack direction={'row'} spacing={1}>
        <div className="text-secondary">
          <FiBell size={28} />
        </div>
        <div>
          <Typography marginTop={0} fontSize={20} color="text.primary">
            {notification.title}
          </Typography>
          <p
            className="text-txt-secondary"
            dangerouslySetInnerHTML={{ __html: notification.message }}
          ></p>
        </div>
      </Stack>
      <div className="text-end">
        <Button onClick={handelSetAsRead} disabled={isPending} variant="outlined">
          Mark as Read
        </Button>
      </div>
    </div>
  );
}

export default UnReadNotificationCard;
