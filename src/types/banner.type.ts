export interface Banner {
  _id: string;
  image: string;
  link: string;
  status: BannerStatus;
  createdAt: string;
  updatedAt: string;
}

export enum BannerStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

export type CreateBannerPayload = Pick<Banner, 'image' | 'link'>;

export type UpdateBannerPayload = Partial<Pick<Banner, 'image' | 'link' | 'status'>>;
