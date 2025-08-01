import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { FiBell } from 'react-icons/fi';

function UnReadNotificationCard() {
  return (
    <div className=" p-2 md:p-3">
      <Stack direction={'row'} spacing={1}>
        <div className="text-secondary">
          <FiBell size={28} />
        </div>
        <div>
          <Typography marginTop={0} fontSize={20} color="text.primary">
            Your order is delivered
          </Typography>
          <Typography color="text.secondary">
            The screen feels so lively new faces, new song, top tier chemistry between the leads,
            that's the sign of good movies.
          </Typography>
        </div>
      </Stack>
      <div className="text-end">
        <Button variant="outlined">Mark as Read</Button>
      </div>
    </div>
  );
}

export default UnReadNotificationCard;
