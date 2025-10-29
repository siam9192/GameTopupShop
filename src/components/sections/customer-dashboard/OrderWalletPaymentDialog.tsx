import { useAppSettings } from '@/provider/AppSettingsProvider';
import { createOrderMutation } from '@/query/services/order';
import {
  makeOrderLivePaymentMutation,
  makeOrderWalletPaymentMutation,
} from '@/query/services/transaction';
import { getMyWalletQuery } from '@/query/services/wallet';
import { Offer } from '@/types/offer.type';
import { CreateOrderPayload, FieldInfo, ProductCategory } from '@/types/order.type';
import { Topup, TopupPackage } from '@/types/topup.type';
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Stack,
  Typography,
  Divider,
} from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';

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

function OrderWalletPaymentDialog({ data, onClose }: Props) {
   const {currency} = useAppSettings()
  const { data: resData, isLoading } = getMyWalletQuery();
  const { product, selectedPackage, quantity, productType, fieldsInfo } = data;
  const wallet = resData?.data;

  const price =
    selectedPackage && productType === 'Topup' ? selectedPackage.price : (product as Offer).price;

  // For example only — you might calculate amount differently:
  const estimatedAmount = quantity * price; // replace with actual product price
  const hasEnoughBalance = wallet ? wallet?.balance >= estimatedAmount : false;
  const { mutate: createOrderMutate, isPending: orderCreating } = createOrderMutation();
  const { mutate: createPaymentMutate, isPending: creatingPayment } =
    makeOrderWalletPaymentMutation();

  const handleConfirmPayment = () => {
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
          },
          {
            onSuccess(data) {
              toast.success('Order successful');
              onClose();
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
      <DialogTitle>Make Wallet Payment</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <div className="h-[300px] flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <Stack spacing={3} className="py-2">
            <div>
              <Typography variant="h6" className="font-semibold">
                Wallet Summary
              </Typography>
              <Divider className="mt-4" />
              <div className="mt-5">
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body1">Available Balance</Typography>
                  <Typography variant="body1" fontWeight={600}>
                   {currency.symbol} {wallet?.balance?.toFixed(2)}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body1">Estimated Amount</Typography>
                  <Typography variant="body1" fontWeight={600}>
                      {currency.symbol} {estimatedAmount.toFixed(2)} 
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body1">Remaining Balance</Typography>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    color={hasEnoughBalance ? 'success.main' : 'error.main'}
                  >
                    {((wallet ? wallet.balance : 0) - estimatedAmount).toFixed(2)} ৳
                  </Typography>
                </Stack>
              </div>
            </div>

            {!hasEnoughBalance && (
              <Typography color="error">
                Your wallet balance is insufficient for this payment.
              </Typography>
            )}

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" color="inherit" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={!hasEnoughBalance || isPending}
                onClick={handleConfirmPayment}
              >
                Confirm Payment
              </Button>
            </Stack>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default OrderWalletPaymentDialog;
