import { Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import AlertDialog from '../ui/AleartDialog';
import { Order, OrderStatus } from '@/types/order.type';
import { getTimeAgo } from '@/utils/helper';
import CustomerOrderDetailsDialog from '../sections/customer-dashboard/CustomerOrderDetailsDialog';
import { updateOrderMutation, updateOrderStatusMutation } from '@/query/services/order';
import { toast } from 'react-toastify';
import { queryClient } from '@/provider/Provider';
interface Props {
  order: Order;
}
function CustomerRecentOrderCard({ order }: Props) {
  const { product } = order;
  const [showDetails, setShowDetails] = useState(false);

  const { mutate: updateStatusMutate, isPending } = updateOrderStatusMutation();
  async function handleCancelOrder(id: string, status: OrderStatus) {
    updateStatusMutate(
      {
        id,
        status,
      },
      {
        onSuccess: data => {
          toast.success('Order is canceled successfully');

          queryClient.invalidateQueries({ queryKey: ['getMyRecentOrders'] });
        },
        onError: (err: any) => {
          toast.error(err.message);
        },
      },
    );
  }

  return (
    <div className="relative p-2 duration-300">
      {/* Header: Product Info */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'center' }}
        spacing={2}
      >
        <div className="mt-2">
          <Typography variant="h6" fontWeight={600} color="text.primary">
            {product.name}
          </Typography>

          <Stack
            marginTop={1.5}
            direction="row"
            flexWrap="wrap"
            alignItems="center"
            gap={{ xs: 1.5, md: 3 }}
          >
            <Typography fontSize={15} fontWeight={500} color="text.secondary">
              Category: <span className="text-txt-primary">{product.category}</span>
            </Typography>

            {product.package && (
              <Typography fontSize={15} fontWeight={500} color="text.secondary">
                Package: <span className="text-txt-primary">{product.package}</span>
              </Typography>
            )}

            <Typography fontSize={15} fontWeight={500} color="text.secondary">
              Quantity: <span className="text-txt-primary">{product.quantity}</span>
            </Typography>

            <Typography fontSize={15} fontWeight={500} color="text.secondary">
              Status:{' '}
              <Typography
                component="span"
                fontSize="inherit"
                fontWeight={600}
                color={'text.primary'}
              >
                {order.status}
              </Typography>
            </Typography>
          </Stack>
        </div>

        {/* Amount */}
        <Typography variant="h5" fontWeight={600} color="secondary" className="text-right">
          ${order.payment.amount}
        </Typography>
      </Stack>

      {/* Actions */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={1.5}
        marginTop={3}
      >
        <Button onClick={() => setShowDetails(true)} variant="outlined" color="info" size="medium">
          Details
        </Button>
      </Stack>

      {/* Time badge */}
      <span className="absolute top-0 right-3 text-[.6rem] font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">
        {getTimeAgo(order.createdAt)}
      </span>
      {showDetails ? (
        <CustomerOrderDetailsDialog onClose={() => setShowDetails(false)} id={order._id} />
      ) : null}
    </div>
  );
}

export default CustomerRecentOrderCard;
