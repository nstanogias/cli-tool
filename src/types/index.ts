export interface Transaction {
  user_id: string;
  timestamp: string;
  currency: Currency;
  amount: string;
}

export interface GroupedTransactions {
  [key: string]: {
    balances: Balance;
    last_activity: string;
  };
}

export interface Balance {
  [Currency.EUR]: number;
  [Currency.GBP]: number;
  [Currency.USD]: number;
}

export enum Currency {
  GBP = 'GBP',
  USD = 'USD',
  EUR = 'EUR',
}
