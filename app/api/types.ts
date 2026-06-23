export interface Account {
  account_number: string;
  owner_name: string;
  account_type: "SAVING" | "CURRENT";
  balance: number;
  status: "ACTIVE" | "CLOSED";
}

export type ApiWithMetaResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  meta: {
    page: number;
    per_page: number;
    total: number;
  };
};
export interface Transaction {
  transaction_ref: string;
  transaction_type: "DEPOSIT" | "WITHDRAWAL";
  amount: number;
  balance_before: number;
  balance_after: number;
  description: string;
  created_at: string;
}


export interface CreateAccountData {
  owner_name: string
  citizen_id: string
  phone_number: string,
  account_type: "CURRENT" | "SAVING"
  initial_balance: number
}

export interface CloseAccount {
  account_number: string
}



export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

