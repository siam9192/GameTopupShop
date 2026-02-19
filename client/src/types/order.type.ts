import { Customer } from './customer.type';

export interface Order {
  _id: string;
  customerId: string;
  customer: Customer;
  product: OrderProduct;
  fieldsInfo: FieldInfo[];
  payment: OrderPayment;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export type OrderProduct = {
  productId: string;
  name: string;
  package?: string;
  category: ProductCategory;
  image: string;
  price: number;
  quantity: number;
};

export type FieldInfo = {
  name: string;
  value: string;
};

export type OrderPayment = {
  transactionId?: string;
  amount: number;
  status: PaymentStatus;
};

export enum ProductCategory {
  TOP_UP = 'Topup',
  OFFER = 'Offer',
}

export enum OrderStatus {
  PENDING = 'Pending',
  RUNNING = 'Running',
  COMPLETED = 'Completed',
  REFUNDED = 'Refunded',
  FAILED = 'Failed',
}

export enum PaymentStatus {
  PAID = 'Paid',
  UNPAID = 'Unpaid',
}

export interface CreateOrderPayload {
  productId: string;
  packageId?: string;
  category: ProductCategory;
  quantity: number;
  fieldsInfo: FieldInfo[];
}

export type OrdersFilterPayload = Partial<{
  id: string;
  searchTerm: string;
  customerId: string;
  minAmount: string;
  maxAmount: string;
  status: OrderStatus;
  category: ProductCategory;
  createdAt: string;
  updatedAt: string;
}>;

export type UpdateOrderStatusPayload = {
  id: string;
  status: OrderStatus;
};
