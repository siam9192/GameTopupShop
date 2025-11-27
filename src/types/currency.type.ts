export interface Currency {
  name: string; // Full currency name (e.g., "Bangladeshi Taka")
  code: string; // ISO code (e.g., "BDT", "USD")
  symbol: string; // Symbol (e.g., "৳", "$")
  status: CurrencyStatus; // Availability status
}

export enum CurrencyStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

export type CreateCurrencyPayload = Pick<Currency, 'name' | 'code' | 'symbol' | 'status'>;

export type CurrenciesFilterPayload = Partial<{ searchTerm: string; status: CurrencyStatus }>;
