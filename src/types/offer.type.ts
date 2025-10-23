export interface Offer {
  _id: string;
  name: string;
  platformName: string;
  startDate: string;
  endDate: string;
  price: number;
  coverPhoto: string;
  description: string;
  infoFields: OfferInfoField[];
  ordersCount: number;
  status: OfferStatus;
  createdAt: string;
  updatedAt: string;
}

export type OfferInfoField = {
  name: string;
  placeholder?: string;
  type: OfferInfoFieldType;
  minLength?: number;
  maxLength: number;
  min?: number;
  max?: number;
  optional: boolean;
};

export enum OfferInfoFieldType {
  TEXT = 'text',
  NUMBER = 'number',
  TEXTAREA = 'textarea',
}

export enum OfferStatus {
  PENDING = 'Pending',
  RUNNING = 'Running',
  PAUSED = 'Paused',
  ENDED = 'Ended',
  DELETED = 'Deleted',
}

export interface CreateOfferPayload
  extends Pick<
    Offer,
    'name' | 'price' | 'platformName' | 'coverPhoto' | 'description' | 'infoFields'
  > {
  startDate: string;
  endDate: string;
}

export type UpdateOfferPayload = Partial<CreateOfferPayload>;

export interface UpdateOfferStatusPayload {
  id: string;
  status: OfferStatus;
}

export type OffersFilterPayload = Partial<
  Pick<Offer, 'name' | 'platformName' | 'status'> & {
    searchTerm: string;
    startDate: string;
    endDate: string;
  }
>;

export type PopularOffer = {
  _id: string;
  rank: number;
  name: string;
  coverPhoto: string;
  platformName: string;
  revenue: number;
  ordersSuccess: number;
  ordersCount: number;
  status: OfferStatus;
};
