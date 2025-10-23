import { Order } from '@/types/order.type';
import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import CustomerOrderDetailsDialog from '../sections/customer-dashboard/CustomerOrderDetailsDialog';

interface Props {
  order: Order;
}

function CustomerOrderCard({ order }: Props) {
  const { product } = order;
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className=" p-2 md:p-3  relative">
      <Stack
        direction={{
          xs: 'column',
          md: 'row',
        }}
        spacing={2}
      >
        <Box>
          <img
            src="https://play-lh.googleusercontent.com/Odw8BGugaJLdbaSbCeZWbTE3Qz1wTiQ0Tsn9nzpoQdnkzWb-gaI58zzTmYDvGpdYKg"
            alt=""
            className=" size-20 md:size-24 lg:size-28 rounded-lg"
          />
        </Box>

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
              <Typography fontSize={15} fontWeight={500} color="text.secondary">
                Date:{' '}
                <span className="text-txt-primary">
                  {new Date(order.createdAt).toDateString()}-
                  {new Date(order.createdAt).toLocaleTimeString()}
                </span>
              </Typography>
            </Stack>
          </div>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={1.5}
        marginTop={3}
      >
        <Button onClick={() => setShowDetails(true)} variant="outlined" color="info" size="large">
          Details
        </Button>
      </Stack>
      {/* Amount */}
      <Typography
        variant="h5"
        fontWeight={600}
        color="secondary"
        className=" top-1 right-0 absolute"
      >
        ${order.payment.amount}
      </Typography>

      {showDetails ? (
        <CustomerOrderDetailsDialog id={order._id} onClose={() => setShowDetails(false)} />
      ) : null}
    </div>
  );
}

export default CustomerOrderCard;
