export interface Topup {
  _id: string;
  name: string;
  platformName: string;
  startFrom: number;
  packages: TopupPackage[];
  coverPhoto: string;
  description: string;
  infoFields: TopupInfoField[];
  ordersCount: number;
  status: TopupStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type TopupInfoField = {
  name: string;
  placeholder?: string;
  type: TopupInfoFieldType;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  optional: boolean;
};

export type TopupPackage = {
  _id: string;
  name: string;
  price: number;
  status: TopupPackageStatus;
};

export type CreatePackage = Pick<TopupPackage, 'name' | 'price' | 'status'>;

export enum TopupInfoFieldType {
  TEXT = 'text',
  NUMBER = 'number',
  TEXTAREA = 'textarea',
}

export enum TopupStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  DELETED = 'DELETED',
}

export enum TopupPackageStatus {
  AVAILABLE = 'Available',
  UNAVAILABLE = 'Unavailable',
}

export type UpdateTopupPayload = Partial<CreateTopupPayload>;

export interface UpdateTopupStatusPayload {
  id: string;
  status: TopupStatus;
}

export type TopupsFilterPayload = Partial<
  Pick<Topup, 'name' | 'platformName' | 'status'> & { searchTerm: string }
>;

export interface CreateTopupPayload
  extends Pick<Topup, 'name' | 'platformName' | 'coverPhoto' | 'description' | 'infoFields'> {
  packages: CreatePackage[];
}

export type PopularTopup = {
  _id: string;
  rank: number;
  name: string;
  coverPhoto: string;
  platformName: string;
  revenue: number;
  ordersSuccess: number;
  ordersCount: number;
  status: TopupStatus;
};
