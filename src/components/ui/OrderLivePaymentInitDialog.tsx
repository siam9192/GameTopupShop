import { getPublicLivePaymentMethodsQuery } from '@/query/services/live-payment-method';
import React, { useState } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Paper,
} from '@mui/material';
import { CreateOrderPayload, FieldInfo, ProductCategory } from '@/types/order.type';
import { createOrderMutation } from '@/query/services/order';
import { toast } from 'react-toastify';
import { makeOrderLivePaymentMutation } from '@/query/services/transaction';
import { Offer } from '@/types/offer.type';
import { Topup, TopupPackage } from '@/types/topup.type';
import { useAppSettings } from '@/provider/AppSettingsProvider';

interface Props {
  data: {
    fieldsInfo: FieldInfo[];
    product: Topup | Offer;
    selectedPackage?: TopupPackage;
    quantity: number;
    productType: ProductCategory;
  };
  onClose: () => void | any;
}
function OrderLivePaymentInitDialog({ data: productData, onClose }: Props) {
  const { data } = getPublicLivePaymentMethodsQuery([{ name: 'limit', value: 40 }]);
  const methods = data?.data;
  const [selectedMethodId, setSelectedMethodId] = useState<string | null>();
   const {currency} = useAppSettings()
  const { mutate: createOrderMutate, isPending: orderCreating } = createOrderMutation();

  const { mutate: createPaymentMutate, isPending: creatingPayment } =
    makeOrderLivePaymentMutation();
  const { fieldsInfo, product, selectedPackage, quantity, productType } = productData;
  const handelInitOrder = () => {
    const payload: CreateOrderPayload = {
      productId: product._id,
      quantity,
      category: productType,
      fieldsInfo,
    };
    if (productType === ProductCategory.TOP_UP && selectedPackage)
      payload['packageId'] = selectedPackage._id;

    createOrderMutate(payload, {
      onSuccess: data => {
        const order = data.data;
        createPaymentMutate(
          {
            orderId: order._id,
            methodId: selectedMethodId as string,
          },
          {
            onSuccess(data) {
              window.location.href = data.data.paymentUrl;
            },
            onError(data) {
              toast.error(data.message);
            },
          },
        );
      },
      onError: data => {
        toast.error(data.message);
      },
    });
  };

  const isPending = orderCreating || creatingPayment;
  return (
    <Dialog open fullWidth maxWidth="sm" onClose={onClose}>
      <DialogTitle>Choose a Live Payment Method</DialogTitle>

      <DialogContent>
        <Grid container columns={{ xs: 1, md: 2, lg: 3 }} spacing={2}>
          {methods?.map(method => (
            <Grid size={1} key={method.code}>
              <Paper
                onClick={() => setSelectedMethodId(method._id)}
                elevation={selectedMethodId === method.code ? 6 : 1}
                className={`cursor-pointer border-2 rounded-lg p-3 flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                  selectedMethodId === method._id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                <div className="relative">
                  {/* Radio Indicator */}
                  <div
                    className={`absolute top-1 right-1 w-4 h-4 rounded-full border-2 ${
                      selectedMethodId === method._id
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-400 bg-white'
                    }`}
                  ></div>

                  {/* Payment Logo */}
                  <img
                    src={method.logo}
                    alt={method.name}
                    className="w-16 h-16 object-contain mx-auto rounded-lg"
                  />
                </div>
                <Typography fontWeight={600} fontFamily="Jost" textAlign="center">
                  {method.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions className="flex justify-between">
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
        <Button
          onClick={handelInitOrder}
          variant="contained"
          color="primary"
          disabled={!selectedMethodId || isPending}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default OrderLivePaymentInitDialog;
