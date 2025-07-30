import { Card, CardContent, Chip, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
function OfferCard() {
  return (
    <div
      className='shadow_1 rounded-md'
    >
      <CardContent>
        <Stack direction={'row'} gap={2}>
          <div className="">
            <img
              src="https://cdn-www.bluestacks.com/bs-images/FreeFire_Guide_DiamondsGuide_EN2.jpg"
              alt=""
              className=" rounded-lg  w-[300px] h-[200px] "
            />
          </div>
          <div className="flex flex-col py-2">
            <div className="space-y-2 grow">
              <Typography fontSize={24} color='text.primary'>20% discount on 600 diamond topup</Typography>

              <Typography fontSize={16} color="text.secondary">
                delectus. Reiciendis pariatur, ipsam saepe in culpa asperiores sed nihil!
              </Typography>
            </div>

            <Chip label="Price: $10" color="primary" className="w-1/2" />
          </div>
        </Stack>
      </CardContent>
    </div>
  );
}

export default OfferCard;
