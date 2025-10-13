export type UsersMetadata = {
  users: number;
  customers: number;
  administrators: number;
  blockedUsers: number;
};

export type ProductsMetadata = {
  products: number;
  inactive: number;
  topups: number;
  offers: number;
  newProducts: number;
};

export type Param = {
  name: string;
  value: string | number;
};
