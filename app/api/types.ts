export interface Account {
  	account_number: string  ;
	owner_name :  string ;
	account_type  : "SAVING"|"CURRENT"  ;
	balance    :number ;
	status       :"ACTIVE" | "CLOSED" ;
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
  id: string;
  account_id: string;
  transaction_type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  description?: string;
  created_at: string;
}

export interface CreateAccountData {
  account_holder: string;
  account_type: string;
  initial_balance?: number;
}

export interface UpdateAccountData {
  account_holder?: string;
  account_type?: string;
  balance?: number;
}

export interface CreateTransactionData {
  account_id: string;
  transaction_type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  description?: string;
  target_account_id?: string; // for transfers
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface StatData {
  totalBalance: number;
  activeAccounts: number;
  totalTransactions: number;
  balanceChange: number;
  accountsChange: number;
  transactionsChange: number;
}
