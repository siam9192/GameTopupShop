import { z } from 'zod';
import { LivePaymentMethod, TransactionStatus } from './transaction.interface';

const updateTransactionStatusValidation = z.object({
  id: z.string().nonempty(),
  status: z.nativeEnum(TransactionStatus),
});

const makeOrderWalletPaymentValidation = z.object({
  orderId: z.string().nonempty(),
});

const makeOrderLivePaymentValidation = z.object({
  orderId: z.string().nonempty(),
  methodId: z.string().nonempty(),
});

const makeWalletAddBalanceLivePaymentValidation = z.object({
  methodId: z.string().nonempty(),
  amount: z.number(),
});

const transactionValidations = {
  updateTransactionStatusValidation,
  makeOrderLivePaymentValidation,
  makeOrderWalletPaymentValidation,
  makeWalletAddBalanceLivePaymentValidation,
};

export default transactionValidations;
