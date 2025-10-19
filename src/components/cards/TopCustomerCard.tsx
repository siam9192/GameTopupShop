import { Box, Button, Stack, Typography, Avatar, Chip } from '@mui/material';
import React from 'react';
import AlertDialog from '../ui/AleartDialog';
import { TopCustomer } from '@/types/customer.type';
interface Props {
  customer: TopCustomer;
}
function TopCustomerCard({ customer }: Props) {
  return (
    <Box className="rounded-2xl relative">
      {/* Top Row: Avatar & Info */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center">
        <Avatar src={customer.profilePicture} alt={customer.name} sx={{ width: 50, height: 50 }} />

        <Stack spacing={0.2} flex={1}>
          <Typography fontWeight={500} fontSize={{ xs: 12, lg: 12 }} color="primary">
            #{customer.rank.toString()}
          </Typography>
          <Typography fontWeight={600} fontSize={20} color="text.primary">
            {customer.name}
          </Typography>
        </Stack>
      </Stack>

      {/* Bottom Row: Button */}
      <Stack direction="row" justifyContent="flex-end" marginTop={1}>
        <AlertDialog>
          <Button variant="outlined" color="secondary" size="small">
            Details
          </Button>
        </AlertDialog>
      </Stack>

      {/* Points Badge */}
      <div className="font-medium absolute right-1 top-0 w-fit p-1 text-sm text-green-500 rounded-full text-center">
        {customer.point} Pts
      </div>
    </Box>
  );
}

export default TopCustomerCard;
