import { AccountStatus, AdministratorLevel, Name } from './user.type';

export interface Administrator {
  _id: string;
  name: Name;
  fullName: string;
  profilePicture: string;
  level: AdministratorLevel;
  email: string;
  password: string;
  passwordLastChangedAt: Date;
  status: AccountStatus;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateAdministratorProfilePayload
  extends Partial<{
    name: Name;
    profilePicture: string;
  }> {}
