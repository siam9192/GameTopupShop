import React, { useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { createWalletSubmissionMutation } from '@/query/services/wallet-submission';
import walletSubmissionValidations from '@/validations/wallet-submission.validation';
import { CreateWalletSubmissionPayload } from '@/types/wallet-submission.type';
import { toast } from 'react-toastify';

type FormValue = {
  note: string;
  amount: number | string;
};

type FormError = Record<string, string>;
const defaultValue = {
  note: '',
  amount: '',
};
interface Props {
  methodId: string;
}

function ManualPaymentAddMoneySubmissionForm({ methodId }: Props) {
  const [form, setForm] = useState<FormValue>(defaultValue);
  const [errors, setErrors] = useState<FormError>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { mutate, isPending } = createWalletSubmissionMutation();
  const handelReset = () => {
    setForm(defaultValue);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.preventDefault();
    setErrors({});

    // Prepare validation payload
    const payload = {
      methodId: methodId,
      note: form.note,
      amount: Number(form.amount),
    };

    const result = walletSubmissionValidations.createWalletSubmissionValidation.safeParse(payload);

    if (!result.success) {
      const fieldErrors: FormError = {};
      result.error.issues.forEach(err => {
        const fieldName = err.path[0] as keyof FormValue;
        fieldErrors[fieldName] = err.message;
      });

      setErrors(fieldErrors);
      return;
    }
    mutate(payload as CreateWalletSubmissionPayload, {
      onSuccess: data => {
        toast.success(data.message);
        handelReset();
      },
      onError: data => {
        toast.error(data.message);
      },
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: { xs: '100%', md: '80%', lg: '50%' },
        mx: 'auto',
        mt: 3,
        p: 3,
        borderRadius: 3,
        boxShadow: 3,
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h5" color="text.primary" fontWeight={600} textAlign="center" mb={2}>
        Submission Form
      </Typography>

      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Enter require infos"
          name="note"
          multiline
          minRows={4} // you can change to rows={4} if you want fixed height
          value={form.note}
          onChange={handleChange}
          error={!!errors['note']}
          helperText={errors['note']}
          required
        />
        <TextField
          fullWidth
          label="Amount"
          name="amount"
          placeholder="Enter amount"
          onChange={handleChange}
          value={form.amount}
          error={!!errors['amount']}
          helperText={errors['amount']}
          required
        />

        {/* Submit Button */}
        <Button disabled={isPending} variant="contained" size="large" color="primary" type="submit">
          Submit
        </Button>
      </Stack>
    </Box>
  );
}

export default ManualPaymentAddMoneySubmissionForm;
