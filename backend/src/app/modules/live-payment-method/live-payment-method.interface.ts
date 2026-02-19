import { Document } from 'mongoose';

export interface LivePaymentMethod extends Document {
  name: string;
  logo: string;
  code: string;
  status: LivePaymentMethodStatus;
  isAvailable: boolean;
}

export enum LivePaymentMethodStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

export interface LivePaymentMethodsFilterPayload {
  searchTerm?: string;
  status?: LivePaymentMethodStatus;
}

export interface UpdateLivePaymentMethodStatus {
  id: string;
  status: LivePaymentMethodStatus;
}
