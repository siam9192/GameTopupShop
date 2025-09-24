import { Administrator } from './administrator.type';
import { Customer } from './customer.type';

export type CurrentUser = Customer | Administrator;

export type RecentUser = {
  _id: string;
  fullName: string;
  profilePicture: string;
  role: UserRole;
  provider: Provider;
  createdAt: string;
};

export type Name = {
  first: string;
  last: string;
};

export enum Provider {
  GOOGLE = 'Google',
  EMAIL_PASSWORD = 'Email_Password',
  FACEBOOK = 'Facebook',
}

export enum AdministratorLevel {
  SUPER_ADMIN = 'Super_Admin',
  ADMIN = 'Admin',
  MODERATOR = 'Moderator',
}

export enum AccountStatus {
  ACTIVE = 'Active',
  BLOCKED = 'Blocked',
  DELETED = 'Deleted',
}

export enum UserRole {
  CUSTOMER = 'Customer',
  SUPER_ADMIN = 'Super_Admin',
  ADMIN = 'Admin',
  MODERATOR = 'Moderator',
}
