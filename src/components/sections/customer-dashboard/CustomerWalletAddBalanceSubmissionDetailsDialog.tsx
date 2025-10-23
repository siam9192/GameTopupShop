'use client';
import {
  getMyWalletSubmissionByIdQuery,
  getWalletSubmissionByIdQuery,
} from '@/query/services/wallet-submission';
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
function CustomerWalletAddBalanceSubmissionDetailsDialog({ id, onClose }: Props) {
  const { data, isLoading, error } = getMyWalletSubmissionByIdQuery(id);
  const submission = data?.data;

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
                      __html: submission.note,
                    }}
                    fontWeight={500}
                  ></Typography>
                </Typography>
              </Stack>
            </Box>
          )}
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

export default CustomerWalletAddBalanceSubmissionDetailsDialog;
