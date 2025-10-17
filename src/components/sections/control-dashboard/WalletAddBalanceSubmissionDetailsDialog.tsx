'use client';
import { getWalletSubmissionByIdQuery } from '@/query/services/wallet-submission';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';

interface Props {
  id: string;
  onClose: () => void | any;
}
function WalletAddBalanceSubmissionDetailsDialog({ id, onClose }: Props) {
  const { data, isLoading } = getWalletSubmissionByIdQuery(id);
  const submission = data?.data;
  const customer = submission?.customer;
  const method = submission?.method;

  return (
    <Dialog open={true} fullWidth onClose={onClose}>
      <DialogTitle>Submission Details</DialogTitle>

      {isLoading ? (
        <CircularProgress sx={{ margin: '20px auto', display: 'block' }} />
      ) : (
        <DialogContent dividers>
          {/* SUBMISSION DETAILS */}
          {submission && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Submission Details
              </Typography>
              <Stack spacing={1.2}>
                <Typography fontSize={15} color="text.secondary">
                  Submission ID:{' '}
                  <Typography component="span" fontWeight={600}>
                    {submission._id}
                  </Typography>
                </Typography>
                <Typography fontSize={15} color="text.secondary">
                  Amount:{' '}
                  <Typography component="span" color="success.main" fontWeight={600}>
                    {submission.amount.toLocaleString()} BDT
                  </Typography>
                </Typography>
                <Typography fontSize={15} color="text.secondary">
                  Method:{' '}
                  <Typography component="span" fontWeight={600}>
                    {submission.methodName}
                  </Typography>
                </Typography>
                <Typography fontSize={15} color="text.secondary">
                  Status:{' '}
                  <Typography component="span" fontWeight={600}>
                    {submission.status}
                  </Typography>
                </Typography>
                {submission.declineReason && (
                  <Typography fontSize={15} color="error.main" fontWeight={500}>
                    Decline Reason: {submission.declineReason}
                  </Typography>
                )}
                <Typography fontSize={15} color="text.secondary">
                  Submitted At:{' '}
                  <Typography component="span" fontWeight={600}>
                    {new Date(submission.createdAt).toLocaleString()}
                  </Typography>
                </Typography>
                <Typography fontSize={15} color="text.secondary">
                  Details Note: <br />
                  <Typography
                    component="span"
                    dangerouslySetInnerHTML={{
                      __html: `  Lorem ipsum dolor, sit amet consectetur \n adipisicing elit. Similique, soluta reiciendis nihil corrupti aspernatur expedita porro iste perferendis tempora molestiae.`,
                    }}
                    fontWeight={500}
                  ></Typography>
                </Typography>
              </Stack>
              <Divider sx={{ my: 2 }} />
              {/* METHOD DETAILS */}
              {submission.method && (
                <Box mt={2}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Payment Method Info
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      src={submission.method.logo}
                      alt={submission.method.name}
                      sx={{ width: 40, height: 40 }}
                    />
                    <Box>
                      <Typography fontWeight={600}>{submission.method.name}</Typography>
                      <Typography fontSize={14} color="text.secondary">
                        {submission.method.description}
                      </Typography>
                    </Box>
                  </Stack>
                  <Typography fontSize={14} mt={1}>
                    ID: {submission.method._id}
                  </Typography>
                  <Typography fontSize={14}>
                    Status:{' '}
                    <Typography component="span" fontWeight={600}>
                      {submission.method.status}
                    </Typography>
                  </Typography>
                </Box>
              )}
            </Box>
          )}

          <Divider sx={{ my: 2 }} />
          {/* CUSTOMER DETAILS */}
          <Box mb={3}>
            <Typography variant="h6" gutterBottom>
              Customer Info
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
              <Avatar
                src={customer?.profilePicture}
                alt={customer?.fullName}
                sx={{ width: 60, height: 60 }}
              />
              <Box>
                <Typography fontWeight={600}>{customer?.fullName || 'N/A'}</Typography>
                <Typography fontSize={14} color="text.secondary">
                  {customer?.email || 'N/A'}
                </Typography>
              </Box>
            </Stack>
            <Stack spacing={1.2}>
              <Typography fontSize={15} color="text.secondary">
                Customer ID:{' '}
                <Typography component="span" color="text.primary" fontWeight={600}>
                  {customer?._id || 'N/A'}
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

export default WalletAddBalanceSubmissionDetailsDialog;
