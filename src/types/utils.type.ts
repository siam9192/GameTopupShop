import { IconType } from 'react-icons';
import { AdministratorLevel } from './user.type';

export type Filters = Record<string, string | number>;

export type SortState = {
  by: string;
  order: SortOrder;
};

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

// ---------------------- Types ----------------------
export interface RouteItem {
  label: string;
  path?: string;
  icon?: IconType;
  roles?: AdministratorLevel[];
  children?: RouteItem[];
}

export interface SearchProduct {
  _id: string;
  name: string;
  coverPhoto: string;
  type: 'Topup' | 'Order';
}
