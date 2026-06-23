import axios from "axios";
import type {
  Account,
  Transaction,
  CreateAccountData,

  ApiWithMetaResponse,
  ApiResponse
} from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://bank-api-lngs.onrender.com/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getAccountList(page: number, limit: number = 10): Promise<{
  accountList: Account[];
  meta: ApiWithMetaResponse<Account[]>["meta"];
}> {
  // console.log(API_BASE_URL);
  const res = await apiClient.get<ApiWithMetaResponse<Account[]>>("/accounts", {
    params: {
      page,
      limit,
    },
  });

  return {
    accountList: res.data.data,
    meta: res.data.meta,
  };
}

export async function getAccountById(id: string): Promise<Account> {
  try {
    const res = await apiClient.get<Account>(`/accounts/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching account ${id}:`, error);
    throw error;
  }
}

export async function createAccount(accountData: CreateAccountData): Promise<Account> {
  try {
    const res = await apiClient.post<ApiResponse<Account>>('/accounts', accountData);
    return res.data.data;
  } catch (error) {
    console.error('Error creating account:', error);
    throw error;
  }
}

// export async function updateAccount(id: string, accountData: UpdateAccountData): Promise<Account> {
//   try {
//     const res = await apiClient.put<Account>(`/accounts/${id}`, accountData);
//     return res.data;
//   } catch (error) {
//     console.error(`Error updating account ${id}:`, error);
//     throw error;
//   }
// }

export async function closeAccount(accountNumber: string): Promise<void> {
  try {
    await apiClient.patch(`/accounts/${accountNumber}/close`);
  } catch (error) {
    console.error(`Error closing account ${accountNumber}:`, error);
    throw error;
  }
}

// Transaction related APIs
export async function getTransactionsHistrory(account_number: string, page: number, limit: number = 10): Promise<{
  transactionList: Transaction[];
  meta: ApiWithMetaResponse<Transaction[]>["meta"];
}> {
  try {
    const res = await apiClient.get<ApiWithMetaResponse<Transaction[]>>(`/accounts/${account_number}/transactions`, {
      params: {
        page,
        limit,

      }



    });
    return {
      transactionList: res.data.data,
      meta: res.data.meta

    };
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
}
// Transaction related APIs
export async function getAllTransactionsHistrory(page: number, limit: number = 10): Promise<{
  transactionList: Transaction[];
  meta: ApiWithMetaResponse<Transaction[]>["meta"];
}> {
  try {
    const res = await apiClient.get<ApiWithMetaResponse<Transaction[]>>("/transactions", {
      params: {
        page,
        limit,

      }


    });
    return {
      transactionList: res.data.data,
      meta: res.data.meta

    };
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
}

export async function withdraw(account_number: string, amount: number, description: string): Promise<Transaction> {
  try {
    const res = await apiClient.post(`/accounts/${account_number}/withdraw`, {
      amount: amount,
      description: description
    })
    return res.data;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
}

export async function deposit(account_number: string, amount: number, description: string): Promise<Transaction> {
  try {
    const res = await apiClient.post(`/accounts/${account_number}/deposit`, {
      amount: amount,
      description: description
    })
    return res.data;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
}


// Export the API client for custom requests
export default apiClient;