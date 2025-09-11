import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import SectionHeading from '../ui/SectionHeading';

function LatestOrders() {
  return (
    <Box component={'section'} className="">
      <div className="text-center">
        <SectionHeading title="Latest Orders" />
      </div>
      <Box marginTop={5} className="lg:w-[80%] mx-auto space-y-5">
        {Array.from({
          length: 10,
        }).map((_, index) => (
          <Box
            key={index}
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            className="p-5 glass "
          >
            <Stack direction={'row'} spacing={2}>
              <img
                src="https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg"
                alt=""
                className="size-14 rounded-full object-center"
              />
              <Box>
                <Typography color="text.secondary" fontSize={20}>
                  Abu Rayhan
                </Typography>
                <Typography component={'p'} fontSize={12} color="text.secondary">
                  20 Diamond - 772$
                </Typography>
              </Box>
            </Stack>
            <p className="p-2 bg-secondary  text-white rounded-full text-sm">Processing</p>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default LatestOrders;
