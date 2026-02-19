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

export type SuperAdminDashboardMetaData = {
  users: number;
  revenue: number;
  products: number;
  orders: number;
};

export type AdminDashboardMetaData = {
  customers: number;
  revenue: number;
  products: number;
  orders: number;
};

export type ModeratorDashboardMetaData = {
  products: number;
  orders: number;
  runningOrders: number;
  newCustomers: number;
};

export type CustomerDashboardMetaData = {
  walletBalance: number;
  pendingWalletAmount: number;
  orderInProcess: number;
  ordersCompleted: number;
  ordersAmount: number;
};

export type CustomerWalletMetaData = {
  balance: number;
  totalSpend: number;
  last30DaysSpend: number;
  pendingAmount: number;
};
export type Param = {
  name: string;
  value: string | number;
};
