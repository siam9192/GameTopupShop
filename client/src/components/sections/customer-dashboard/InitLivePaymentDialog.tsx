'use client';

import { makeWalletAddBalanceLivePaymentMutation } from '@/query/services/transaction';
import { LivePaymentMethod } from '@/types/live-payment-method.type';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  method: LivePaymentMethod;
  onClose: () => void | any;
}

function InitLivePaymentDialog({ method, onClose }: Props) {
  const [amount, setAmount] = useState<number | string | null>(null);
  const [error, setError] = useState('');

  const { mutate, isPending } = makeWalletAddBalanceLivePaymentMutation();

  const handelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    mutate(
      {
        methodId: method._id,
        amount: amount as number,
      },
      {
        onSuccess: data => {
          const { paymentUrl } = data.data;
          if (!paymentUrl) {
            toast.error('Something went wrong');
            setError('Something went wrong');
            return;
          }

          window.open(paymentUrl);
        },
        onError: data => {
          toast.error(data.message);
          setError(data.message);
        },
      },
    );
  };
  const disabled = isPending || amount === '' || amount === null || isNaN(amount as number);
  return (
    <Dialog open fullWidth maxWidth="sm" onClose={onClose}>
      <DialogTitle>Live Payment</DialogTitle>

      <DialogContent>
        <Box>
          <img
            src={method.logo}
            alt={method.name}
            className="size-28 md:size-32 lg:size-40 object-contain mx-auto rounded-full "
          />
          <Typography
            marginTop={1}
            color="secondary"
            align="center"
            fontSize={16}
            fontWeight={600}
            gutterBottom
          >
            {method.name}
          </Typography>
        </Box>
        <Box mt={2} component={'form'} onSubmit={handelSubmit}>
          <FormControl fullWidth>
            <TextField
              label="Amount"
              name="amount"
              placeholder="Enter amount"
              onChange={e => setAmount(Number(e.target.value))}
              required
            />
          </FormControl>

          <Button
            sx={{
              mt: 2,
            }}
            type="submit"
            disabled={disabled}
            variant="contained"
            size="large"
            fullWidth
          >
            Procced
          </Button>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default InitLivePaymentDialog;
