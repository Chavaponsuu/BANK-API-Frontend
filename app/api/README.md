# API Usage Guide

## Environment Variables

The API base URL is loaded from environment variables. Make sure you have `.env.local` file:

```env
NEXT_PUBLIC_BACKEND_URL=https://bank-api-lngs.onrender.com
```

**Note:** In Next.js, environment variables must be prefixed with `NEXT_PUBLIC_` to be accessible in the browser.

## Usage Examples

### Fetching Account List

```typescript
import { getAccountList } from '@/app/api/api';

async function loadAccounts() {
  try {
    const accounts = await getAccountList();
    console.log('Accounts:', accounts);
  } catch (error) {
    console.error('Failed to load accounts:', error);
  }
}
```

### Creating an Account

```typescript
import { createAccount } from '@/app/api/api';

async function addAccount() {
  try {
    const newAccount = await createAccount({
      account_holder: 'John Doe',
      account_type: 'savings',
      initial_balance: 1000
    });
    console.log('Created account:', newAccount);
  } catch (error) {
    console.error('Failed to create account:', error);
  }
}
```

### Using in React Components

```typescript
'use client'

import { useEffect, useState } from 'react';
import { getAccountList } from '@/app/api/api';
import type { Account } from '@/app/api/types';

export default function AccountList() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAccountList();
        setAccounts(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {accounts.map(account => (
        <div key={account.id}>
          {account.account_holder} - ${account.balance}
        </div>
      ))}
    </div>
  );
}
```

## Available API Functions

### Accounts
- `getAccountList()` - Get all accounts
- `getAccountById(id)` - Get single account
- `createAccount(data)` - Create new account
- `updateAccount(id, data)` - Update account
- `deleteAccount(id)` - Delete account

### Transactions
- `getTransactions()` - Get all transactions
- `createTransaction(data)` - Create new transaction

## Types

All TypeScript types are available in `types.ts`:
- `Account`
- `Transaction`
- `CreateAccountData`
- `UpdateAccountData`
- `CreateTransactionData`
- `StatData`
