import { AccountStatus, Name, Provider } from './user.type';

export interface Customer {
  _id: string;
  name: Name;
  fullName: string;
  profilePicture?: string;
  wallet: string;
  ordersCount: number;
  phone?: string;
  email?: string;
  password?: string;
  googleId?: string;
  facebookId?: string;
  provider: Provider;
  passwordLastChangedAt: Date;
  status: AccountStatus;
  createdAt: string;
  updatedAt: string;
}
