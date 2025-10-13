export type Filters = Record<string, string | number>;

export type SortState = {
  by: string;
  order: SortOrder;
};

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}
