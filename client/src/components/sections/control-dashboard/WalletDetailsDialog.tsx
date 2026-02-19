'use client';
import { getWalletByIdQuery } from '@/query/services/wallet';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';

interface Props {
  id: string;
  onClose: () => void | any;
}
function WalletDetailsDialog({ id, onClose }: Props) {
  const { data, isLoading } = getWalletByIdQuery(id);
  const wallet = data?.data;
  const customer = wallet?.customer;
  return (
    <Dialog open={true} fullWidth onClose={onClose}>
      <DialogTitle>Wallet Details</DialogTitle>

      {isLoading ? (
        <CircularProgress style={{ margin: '20px auto', display: 'block' }} />
      ) : (
        <DialogContent>
          {/* Profile Section */}

          {/* Wallet Summary */}
          <Box>
            <Stack mt={3} mb={2} spacing={1.5} alignItems="center">
              <Typography fontSize={15} color="text.secondary" fontWeight={500}>
                Wallet ID:{' '}
                <Typography component="span" fontWeight={600} color="text.primary">
                  {wallet?._id || 'N/A'}
                </Typography>
              </Typography>

              <Typography fontSize={15} color="text.secondary" fontWeight={500}>
                Balance:{' '}
                <Typography component="span" fontWeight={600} color="success.main">
                  {wallet?.balance?.toLocaleString() || 0} BDT
                </Typography>
              </Typography>
            </Stack>
          </Box>
          {/* <Box>
     <img
            src={customer?.profilePicture || DEFAULT_PROFILE_PICTURE}
            alt="Profile"
            className="size-24 md:size-32 rounded-full mx-auto object-cover border border-gray-300 dark:border-gray-600"
          />
          <Typography
            variant="h5"
            marginTop={1.5}
            textAlign="center"
            fontWeight={600}
            color="text.primary"
          >
            {customer?.fullName || 'Unknown'}
          </Typography>
</Box> */}

          <Box>
            <Stack spacing={1.2}>
              <Typography fontSize={15} fontWeight={500} color="text.secondary">
                ID:{' '}
                <Typography component="span" color="text.primary" fontWeight={600}>
                  {customer?._id || 'N/A'}
                </Typography>
              </Typography>
              <Typography fontSize={15} fontWeight={500} color="text.secondary">
                Name:{' '}
                <Typography component="span" color="text.primary" fontWeight={600}>
                  {customer?.fullName || 'N/A'}
                </Typography>
              </Typography>
              <Typography fontSize={15} fontWeight={500} color="text.secondary">
                Status:{' '}
                <Typography component="span" fontWeight={600}>
                  {customer?.status || 'N/A'}
                </Typography>
              </Typography>

              <Typography fontSize={15} fontWeight={500} color="text.secondary">
                Orders:{' '}
                <Typography component="span" color="text.primary" fontWeight={600}>
                  {customer?.ordersCount || 0}
                </Typography>
              </Typography>

              <Typography fontSize={15} fontWeight={500} color="text.secondary">
                Signup Method:{' '}
                <Typography component="span" color="text.primary" fontWeight={600}>
                  {customer?.provider || 'N/A'}
                </Typography>
              </Typography>

              <Typography fontSize={15} fontWeight={500} color="text.secondary">
                Email:{' '}
                <Typography component="span" color="text.primary" fontWeight={600}>
                  {customer?.email || 'N/A'}
                </Typography>
              </Typography>

              <Typography fontSize={15} fontWeight={500} color="text.secondary">
                Phone:{' '}
                <Typography component="span" color="text.primary" fontWeight={600}>
                  {customer?.phone || 'N/A'}
                </Typography>
              </Typography>

              <Typography fontSize={15} fontWeight={500} color="text.secondary">
                Join Date:{' '}
                <Typography component="span" color="text.primary" fontWeight={600}>
                  {new Date(customer?.createdAt || new Date()).toLocaleString()}
                </Typography>
              </Typography>
            </Stack>
          </Box>
        </DialogContent>
      )}

      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default WalletDetailsDialog;
