import React from 'react';
import { getAdministratorByIdQuery } from '@/query/services/administrator';
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

interface Props {
  id: string;
  onClose: () => void | any;
}
function AdministratorDetailsDialog({ id, onClose }: Props) {
  const { data, isLoading, error } = getAdministratorByIdQuery(id);
  const administrator = data?.data;

  return (
    <Dialog open fullWidth onClose={onClose}>
      <DialogTitle>Administrator Details</DialogTitle>
      {isLoading ? (
        <CircularProgress style={{ margin: '0 auto' }} />
      ) : (
        <DialogContent>
          <img
            src={administrator?.profilePicture || DEFAULT_PROFILE_PICTURE}
            alt=""
            className=" size-20 md:size-32 rounded-full mx-auto"
          />
          <Typography variant="h5" marginTop={1} textAlign={'center'} fontWeight={600}>
            {administrator?.fullName}
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
                Level:
                <Typography
                  fontSize={'inherit'}
                  component={'span'}
                  display={'inline'}
                  fontWeight={500}
                  color="info"
                >
                  {' '}
                  {administrator?.level}
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
                Email : {administrator?.email || 'N/A'}
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
                  {new Date(administrator?.createdAt || new Date()).toDateString()} -{' '}
                  {new Date(administrator?.createdAt || new Date()).toLocaleTimeString()}
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
                  {administrator?.status}
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

export default AdministratorDetailsDialog;
