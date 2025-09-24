import { Box, Button, Stack, Typography, Avatar, Chip } from '@mui/material';
import React from 'react';
import AlertDialog from '../ui/AleartDialog';

function TopCustomerCard() {
  return (
    <Box className="rounded-2xl  relative">
      {/* Top Row: Avatar & Info */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center">
        <Avatar
          src="https://play-lh.googleusercontent.com/Odw8BGugaJLdbaSbCeZWbTE3Qz1wTiQ0Tsn9nzpoQdnkzWb-gaI58zzTmYDvGpdYKg"
          alt="Top Customer"
          sx={{ width: 50, height: 50 }}
        />

        <Stack spacing={0.2} flex={1}>
          <Typography fontWeight={500} fontSize={{ xs: 12, lg: 12 }} color="primary">
            #87783678393896
          </Typography>
          <Typography fontWeight={600} fontSize={20} color="text.primary">
            Md. Jibon Ahmed
          </Typography>
        </Stack>
      </Stack>

      {/* Bottom Row: Button */}
      <Stack direction="row" justifyContent="flex-end" marginTop={2}>
        <AlertDialog>
          <Button variant="outlined" color="secondary" size="small">
            Details
          </Button>
        </AlertDialog>
      </Stack>
      <div className=" font-medium absolute right-1 top-0 w-fit p-1 text-sm   text-green-500 rounded-full text-center">
        1000 Pts
      </div>
    </Box>
  );
}

export default TopCustomerCard;
