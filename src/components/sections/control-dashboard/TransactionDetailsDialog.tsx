'use client';

import React from 'react';
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
  Chip,
} from '@mui/material';
import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from '@/types/transaction.type';
import { getTransactionByIdQuery } from '@/query/services/transaction';

interface Props {
  id: string;
  onClose: () => void;
}

export default function TransactionDetailsDialog({ id, onClose }: Props) {
  const { data, isLoading } = getTransactionByIdQuery(id);
  const transaction: Transaction | undefined = data?.data;

  const customer = transaction?.customer;

  return (
    <Dialog open={true} fullWidth maxWidth="sm" onClose={onClose}>
      <DialogTitle>Transaction Details</DialogTitle>

      {isLoading ? (
        <CircularProgress sx={{ margin: '30px auto', display: 'block' }} />
      ) : (
        <DialogContent dividers>
          {transaction ? (
            <Box>
              {/* Transaction Info */}
              <Typography variant="h6" gutterBottom>
                Transaction Info
              </Typography>

              <Stack spacing={1.2}>
                <Typography fontSize={15} color="text.secondary">
                  Transaction ID:{' '}
                  <Typography component="span" fontWeight={600}>
                    {transaction._id}
                  </Typography>
                </Typography>

                <Typography fontSize={15} color="text.secondary">
                  Order ID:{' '}
                  <Typography component="span" fontWeight={600}>
                    {transaction.orderId || 'N/A'}
                  </Typography>
                </Typography>

                <Typography fontSize={15} color="text.secondary">
                  Amount:{' '}
                  <Typography component="span" fontWeight={600} color="success.main">
                    {transaction.amount.toLocaleString()} {transaction.currency}
                  </Typography>
                </Typography>

                <Typography fontSize={15} color="text.secondary">
                  Type:{' '}
                  <Chip
                    label={transaction.type}
                    color={transaction.type === TransactionType.CREDIT ? 'success' : 'error'}
                    size="small"
                    component={'span'}
                  />
                </Typography>

                <Typography fontSize={15} color="text.secondary">
                  Method:{' '}
                  <Chip
                    label={transaction.method}
                    color="primary"
                    size="small"
                    sx={{ textTransform: 'capitalize' }}
                    component={'span'}
                  />
                </Typography>

                {transaction.reference && (
                  <Typography fontSize={15} color="text.secondary">
                    Reference:{' '}
                    <Typography component="span" fontWeight={600}>
                      {transaction.reference}
                    </Typography>
                  </Typography>
                )}

                {transaction.description && (
                  <Typography fontSize={15} color="text.secondary">
                    Description: <br />
                    <Typography component="span" fontWeight={500}>
                      {transaction.description}
                    </Typography>
                  </Typography>
                )}

                <Typography fontSize={15} color="text.secondary">
                  Status:{' '}
                  <Chip
                    label={transaction.status}
                    color={
                      transaction.status === TransactionStatus.SUCCESS
                        ? 'success'
                        : transaction.status === TransactionStatus.PENDING
                          ? 'warning'
                          : 'error'
                    }
                    component={'span'}
                    size="small"
                  />
                </Typography>

                <Typography fontSize={15} color="text.secondary">
                  Created At:{' '}
                  <Typography component="span" fontWeight={600}>
                    {new Date(transaction.createdAt).toLocaleString()}
                  </Typography>
                </Typography>

                <Typography fontSize={15} color="text.secondary">
                  Updated At:{' '}
                  <Typography component="span" fontWeight={600}>
                    {new Date(transaction.updatedAt).toLocaleString()}
                  </Typography>
                </Typography>
              </Stack>

              <Divider sx={{ my: 2 }} />

              {/* Customer Info */}
              <Box>
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
            </Box>
          ) : (
            <Typography color="text.secondary" textAlign="center">
              No transaction details found.
            </Typography>
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
