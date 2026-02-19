import e from 'express';
import { z } from 'zod';

const createWalletSubmissionValidation = z.object({
  methodId: z.string().nonempty(),
  amount: z.number().min(0),
  note: z.string(),
});

const declineWalletSubmissionValidation = z.object({
  declineReason: z.string().nonempty(),
});

const walletSubmissionValidations = {
  createWalletSubmissionValidation,
  declineWalletSubmissionValidation,
};

export default walletSubmissionValidations;
