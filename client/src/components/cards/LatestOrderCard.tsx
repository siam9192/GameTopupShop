import { useAppSettings } from '@/provider/AppSettingsProvider';
import { Order } from '@/types/order.type';
import { OrderStatus } from '@/types/order.type'; // ensure it's imported from the same file
import { Avatar, Box, Stack, Typography, Chip, Divider } from '@mui/material';
import React from 'react';

interface Props {
  order: Order;
}

function LatestOrderCard({ order }: Props) {
  const { customer, product, payment, status } = order;
  const { currency } = useAppSettings();
  // Map order status to MUI Chip color
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.COMPLETED:
        return 'success';
      case OrderStatus.RUNNING:
        return 'info';
      case OrderStatus.PENDING:
        return 'warning';
      case OrderStatus.REFUNDED:
        return 'secondary';
      case OrderStatus.FAILED:
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box
      className="p-5 rounded-2xl shadow-sm glass hover:shadow-md transition-all duration-200"
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      {/* Product Info */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="subtitle1" color="text.primary" fontWeight={600}>
          {product.name}
        </Typography>

        <Chip label={status} color={getStatusColor(status)} size="small" variant="filled" />
      </Stack>

      <Typography variant="body2" color="text.secondary" mb={2}>
        {product.package ? (
          <>
            Package: {product.package} × {product.quantity} —{' '}
            <strong>
              {currency.symbol}
              {payment.amount}
            </strong>
          </>
        ) : (
          <>
            Quantity: {product.quantity} —{' '}
            <strong>
              {currency.symbol}
              {payment.amount}
            </strong>
          </>
        )}
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* Customer Info */}
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar
          src={customer.profilePicture}
          alt={customer.fullName}
          sx={{ width: 48, height: 48 }}
        />
        <Box>
          <Typography variant="subtitle1" color="text.primary" fontWeight={500}>
            {customer.fullName}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default LatestOrderCard;
