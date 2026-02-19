import { Administrator } from './administrator.type';

export interface AdministratorActivity {
  _id: string;
  title: string;
  description?: string;
  category: string;
  action: AdministratorActivityAction;
  administratorId: string;
  administrator: Administrator;
  createdAt: string;
  updatedAt: string;
}

export enum AdministratorActivityAction {
  CREATE = 'Create',
  UPDATE = 'Update',
  DELETED = 'Delete',
}
