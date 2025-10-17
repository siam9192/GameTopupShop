export interface ManualPaymentMethod {
  _id: string;
  name: string;
  logo: string;
  numbers: string[];
  description: string;
  status: ManualPaymentMethodStatus;
  createdAt: string;
  updatedAt: string;
}

export enum ManualPaymentMethodStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  DELETED = 'Deleted',
}

export type CreateManualPaymentMethodPayload = Pick<
  ManualPaymentMethod,
  'name' | 'logo' | 'description'
>;

export type UpdateManualPaymentMethodPayload = Partial<
  Pick<ManualPaymentMethod, 'name' | 'logo' | 'description'>
>;

export type UpdateManualPaymentMethodStatusPayload = {
  id: string;
  status: ManualPaymentMethodStatus;
};

export type ManualPaymentMethodsFilterPayload = Partial<{
  searchTerm: string;
  name: string;
  status: ManualPaymentMethodStatus;
}>;
