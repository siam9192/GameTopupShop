import z from 'zod';

export const createWalletSubmissionValidation = z.object({
  methodId: z
    .string()
    .nonempty('Please select a payment method.')
    .max(500, 'Payment method ID is too long.'),

  amount: z.number('Invalid amount').min(1, 'Amount must be greater than 0.'),

  note: z
    .string()
    .min(5, 'Note must be at least 5 characters long.')
    .max(1000, 'Note must not exceed 1000 characters.'),
});

export type createWalletSubmissionValidation = z.infer<typeof createWalletSubmissionValidation>;

const walletSubmissionValidations = {
  createWalletSubmissionValidation,
};
export default walletSubmissionValidations;
