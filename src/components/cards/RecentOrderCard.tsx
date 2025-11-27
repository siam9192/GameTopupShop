import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import AlertDialog from '../ui/AleartDialog';
import { Order } from '@/types/order.type';
import { getTimeAgo } from '@/utils/helper';
import OrderDetailsDialog from '../sections/control-dashboard/OrderDetailsDialog';
import { useAppSettings } from '@/provider/AppSettingsProvider';

interface Props {
  order: Order;
}

function RecentOrderCard({ order }: Props) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { product } = order;
  const { payment } = order;
  const { currency } = useAppSettings();
  return (
    <div className=" p-2 md:p-3 relative">
      <Stack
        direction={{
          xs: 'column',
          md: 'row',
        }}
        spacing={2}
      >
        <Box>
          <img src={product.image} alt="" className=" size-20 rounded-lg" />
        </Box>
        <Stack spacing={0.5}>
          <Typography fontWeight={500} fontSize={20} color="text.primary">
            {product.name}
          </Typography>
          <Stack
            marginTop={2}
            direction={'row'}
            alignItems={'center'}
            spacing={{
              xs: 1,
              md: 2,
            }}
          >
            {product.package ? (
              <Typography
                fontWeight={500}
                fontSize={{
                  xs: 14,
                  lg: 16,
                }}
                color="text.secondary"
              >
                Package: {product.package}
              </Typography>
            ) : null}
            <Typography
              fontSize={{
                xs: 14,
                lg: 16,
              }}
              fontWeight={500}
              color="text.secondary"
            >
              Quantity: {product.quantity}
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
                color="success"
              >
                {' '}
                {order.status}
              </Typography>
            </Typography>
          </Stack>
          <Stack
            marginTop={2}
            direction={'row'}
            alignItems={'center'}
            spacing={{
              xs: 1,
              md: 2,
            }}
          >
            <Typography
              fontWeight={500}
              fontSize={{
                xs: 14,
                lg: 16,
              }}
              color="text.secondary"
            >
              Customer : {order.customer.fullName}
            </Typography>
            <Typography
              fontSize={{
                xs: 14,
                lg: 16,
              }}
              fontWeight={500}
              color="text.secondary"
            >
              Customer ID: #{order.customerId}
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        marginTop={1}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        gap={1}
      >
        <Typography variant="h5" fontSize={25} fontWeight={500} color="secondary">
          {currency.symbol}
          {payment.amount}
        </Typography>
        <Stack direction={'row'} spacing={2}>
          <Button
            onClick={() => setIsDetailsOpen(true)}
            variant="outlined"
            className="w-fit "
            color="secondary"
          >
            Details
          </Button>

          {isDetailsOpen ? (
            <OrderDetailsDialog onClose={() => setIsDetailsOpen(false)} id={order._id} />
          ) : null}
        </Stack>
      </Stack>
      <p className="text-primary font-medium absolute right-1 top-0 ">
        {getTimeAgo(order.createdAt)}
      </p>
    </div>
  );
}

export default RecentOrderCard;
