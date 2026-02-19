'use client';
import React from 'react';
import {
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
  Avatar,
} from '@mui/material';
import { getOrderByIdQuery } from '@/query/services/order'; // adjust import path
import { useAppSettings } from '@/provider/AppSettingsProvider';

interface Props {
  id: string;
  onClose: () => void | any;
}

function CustomerOrderDetailsDialog({ id, onClose }: Props) {
  const { data, isLoading } = getOrderByIdQuery(id);
  const order = data?.data;

  const product = order?.product;
  const payment = order?.payment;
  const fieldsInfo = order?.fieldsInfo || [];

  const { currency } = useAppSettings();

  return (
    <Dialog open fullWidth maxWidth="sm" onClose={onClose}>
      <DialogTitle>Order Details</DialogTitle>

      {isLoading ? (
        <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />
      ) : order ? (
        <DialogContent>
          <Divider sx={{ my: 2 }} />

          {/* --- Order Info --- */}
          <Box mb={2}>
            <Typography variant="h6" gutterBottom>
              Order Information
            </Typography>
            <Stack spacing={1.2}>
              <InfoRow label="Order ID" value={order._id} />
              <InfoRow label="Status" value={order.status} color={getStatusColor(order.status)} />
              <InfoRow label="Created At" value={new Date(order.createdAt).toLocaleString()} />
              <InfoRow label="Updated At" value={new Date(order.updatedAt).toLocaleString()} />
            </Stack>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* --- Product Info --- */}
          <Box mb={2}>
            <Typography variant="h6" gutterBottom>
              Product Details
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <img
                src={product?.image}
                alt={product?.name}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 8,
                  objectFit: 'cover',
                }}
              />
              <Box>
                <Typography fontWeight={600}>{product?.name}</Typography>
                <Typography variant="body2">ID: {product?.productId}</Typography>
                {product?.package && (
                  <Typography variant="body2">Package: {product.package}</Typography>
                )}
                <Typography variant="body2">Category: {product?.category}</Typography>
                <Typography variant="body2">Quantity: {product?.quantity}</Typography>
                <Typography variant="body2">
                  Price: {currency.symbol}
                  {product?.price.toLocaleString()}
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* --- Payment Info --- */}
          <Box mb={2}>
            <Typography variant="h6" gutterBottom>
              Payment Information
            </Typography>
            <Stack spacing={1.2}>
              <InfoRow label="Transaction ID" value={payment?.transactionId || 'N/A'} />
              <InfoRow
                label="Amount"
                value={`${currency.symbol}${payment?.amount?.toLocaleString()}`}
              />
              <InfoRow
                label="Status"
                value={payment?.status}
                color={getPaymentColor(payment?.status)}
              />
            </Stack>
          </Box>

          {/* --- Custom Fields --- */}
          {fieldsInfo.length > 0 && (
            <>
              <Divider sx={{ my: 2 }} />
              <Box>
                <Typography variant="h6" gutterBottom>
                  Fields Information
                </Typography>
                <Stack spacing={1}>
                  {fieldsInfo.map((field, idx) => (
                    <InfoRow key={idx} label={field.name} value={field.value} />
                  ))}
                </Stack>
              </Box>
            </>
          )}
        </DialogContent>
      ) : (
        <Typography textAlign="center" color="text.secondary" p={3}>
          Order not found.
        </Typography>
      )}

      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/* --- Helper Component --- */
function InfoRow({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number | undefined;
  color?: string;
}) {
  return (
    <Typography fontSize={15} fontWeight={500} color="text.secondary">
      {label}:{' '}
      <Typography component="span" fontWeight={600} color={color || 'text.primary'}>
        {value || 'N/A'}
      </Typography>
    </Typography>
  );
}

/* --- Color Helpers --- */
function getStatusColor(status?: string) {
  switch (status) {
    case 'Completed':
      return 'success.main';
    case 'Running':
      return 'info.main';
    case 'Pending':
      return 'warning.main';
    case 'Failed':
      return 'error.main';
    case 'Refunded':
      return 'secondary.main';
    default:
      return 'text.primary';
  }
}

function getPaymentColor(status?: string) {
  return status === 'Paid' ? 'success.main' : 'error.main';
}

export default CustomerOrderDetailsDialog;
