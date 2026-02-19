import { getCustomerByIdQuery } from '@/query/services/customer';
import { DEFAULT_PROFILE_PICTURE } from '@/utils/constant';
import {
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
function CustomerDetailsDialog({ id, onClose }: Props) {
  const { data, isLoading } = getCustomerByIdQuery(id);
  const customer = data?.data;

  return (
    <Dialog open fullWidth onClose={onClose}>
      <DialogTitle>Customer Details</DialogTitle>
      {isLoading ? (
        <CircularProgress style={{ margin: '0 auto' }} />
      ) : (
        <DialogContent>
          <img
            src={customer?.profilePicture || DEFAULT_PROFILE_PICTURE}
            alt=""
            className=" size-20 md:size-32 rounded-full mx-auto"
          />
          <Typography variant="h5" marginTop={1} textAlign={'center'} fontWeight={600}>
            {customer?.fullName}
          </Typography>

          <Stack marginTop={2} spacing={0.5}>
            <Stack
              marginTop={2}
              direction={'column'}
              alignItems={{
                xs: 'start',
              }}
              flexWrap={'wrap'}
              gap={{
                xs: 1,
                md: 1,
              }}
            >
              <Typography
                fontSize={{
                  xs: 14,
                  lg: 16,
                }}
                fontWeight={500}
                color="text.secondary"
              >
                Role:
                <Typography
                  fontSize={'inherit'}
                  component={'span'}
                  display={'inline'}
                  fontWeight={500}
                  color="info"
                >
                  {' '}
                  {'Customer'}
                </Typography>
              </Typography>
              <Typography
                fontWeight={500}
                fontSize={{
                  xs: 14,
                  lg: 16,
                }}
                color="text.secondary"
              >
                Wallet Balance : {3000} BDT
              </Typography>
              <Typography
                fontWeight={500}
                fontSize={{
                  xs: 14,
                  lg: 16,
                }}
                color="text.secondary"
              >
                Orders : {customer?.ordersCount || 0}
              </Typography>
              <Typography
                fontWeight={500}
                fontSize={{
                  xs: 14,
                  lg: 16,
                }}
                color="text.secondary"
              >
                Signup Method : {customer?.provider}
              </Typography>

              <Typography
                fontWeight={500}
                fontSize={{
                  xs: 14,
                  lg: 16,
                }}
                color="text.secondary"
              >
                Email : {customer?.email || 'N/A'}
              </Typography>

              <Typography
                fontWeight={500}
                fontSize={{
                  xs: 14,
                  lg: 16,
                }}
                color="text.secondary"
              >
                Phone : {customer?.phone || 'N/A'}
              </Typography>
              <Typography
                fontSize={{
                  xs: 14,
                  lg: 16,
                }}
                fontWeight={500}
                color="text.secondary"
              >
                Join Date:
                <Typography
                  fontSize={'inherit'}
                  component={'span'}
                  display={'inline'}
                  fontWeight={500}
                  color="info"
                >
                  {' '}
                  {new Date(customer?.createdAt || new Date()).toDateString()} -{' '}
                  {new Date(customer?.createdAt || new Date()).toLocaleTimeString()}
                </Typography>
              </Typography>
              <Typography
                fontSize={{
                  xs: 14,
                  lg: 16,
                }}
                fontWeight={500}
                color="text.secondary"
              >
                Status:
                <Typography
                  fontSize={'inherit'}
                  component={'span'}
                  display={'inline'}
                  fontWeight={500}
                  color="info"
                >
                  {' '}
                  {customer?.status}
                </Typography>
              </Typography>
            </Stack>
          </Stack>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CustomerDetailsDialog;
