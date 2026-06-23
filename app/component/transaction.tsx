"use client"

import { useState } from "react";
import { deposit, withdraw } from "../api/api";
import { InputUi } from "./inputUi";

type TransactionType = "deposit" | "withdraw";

export function Transaction() {
  const [transactionType, setTransactionType] = useState<TransactionType>("deposit");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

async function handleTransaction(
  account_number: string,
  amount: number,
  description: string,
  txType: TransactionType
) {
  setLoading(true);

  try {
    const res =
      txType === "deposit"
        ? await deposit(account_number, amount, description)
        : await withdraw(account_number, amount, description);

    return res;
  } catch (error) {
    console.error("Transaction error:", error);
    throw error;
  } finally {
    setLoading(false);
  }
}


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const parsedAmount = parseFloat(amount);

  try {
    await handleTransaction(
      accountNumber,
      parsedAmount,
      description,
      transactionType
    );
  } catch (error) {
    console.error("Submit failed:", error);
  }
};

  return (
    <div className="glass-card rounded-2xl p-6 shadow-md relative overflow-hidden max-w-md mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">New Transaction</h2>
        <p className="text-sm text-gray-600">Manage your account transactions</p>
      </div>

      {/* Sliding Segmented Control */}
      <div className="mb-6">
        <div className="relative glass-card rounded-xl p-1 border border-white/40">
          {/* Sliding Background */}
          <div
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-linear-to-r transition-all duration-300 ease-in-out rounded-lg shadow-md ${
              transactionType === "deposit"
                ? "left-1 from-green-400/90 to-green-500/90"
                : "left-[calc(50%+4px-1px)] from-red-400/90 to-red-500/90"
            }`}
          />

          {/* Buttons */}
          <div className="relative flex gap-2">
            <button
              type="button"
              onClick={() => setTransactionType("deposit")}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                transactionType === "deposit"
                  ? "text-white"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Deposit</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setTransactionType("withdraw")}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                transactionType === "withdraw"
                  ? "text-white"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
                <span>Withdraw</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Icon & Title */}
      {/* <div className="flex flex-col items-center mb-6">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
            transactionType === "deposit"
              ? "bg-linear-to-br from-green-100/80 to-green-200/80 border-2 border-green-300/50"
              : "bg-linear-to-br from-red-100/80 to-red-200/80 border-2 border-red-300/50"
          }`}
        >
          {transactionType === "deposit" ? (
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
            </svg>
          )}
        </div>
        <h3 className="text-xl font-bold text-gray-900 capitalize">{transactionType}</h3>
      </div> */}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputUi
          Label="ACCOUNT NUMBER"
          placeholder="Enter account number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />

        <div className="relative">
          <InputUi
            Label={`AMOUNT (฿)`}
            placeholder="0.00"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {amount && (
            <div className="absolute right-4 top-[42px] flex items-center gap-2">
              <span className={`text-sm font-semibold ${
                transactionType === "deposit" ? "text-green-600" : "text-red-600"
              }`}>
                {transactionType === "deposit" ? "+" : "-"} ฿{parseFloat(amount).toLocaleString()}
              </span>
            </div>
          )}
        </div>

        <InputUi
          Label="DESCRIPTION (Optional)"
          placeholder="Add a note..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Quick Amount Buttons */}
        <div className="pt-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Quick Amount</label>
          <div className="grid grid-cols-4 gap-2">
            {[100, 500, 1000, 5000].map((quickAmount) => (
              <button
                key={quickAmount}
                type="button"
                onClick={() => setAmount(quickAmount.toString())}
                className="glass-card px-3 py-2 rounded-lg border border-white/30 
                         hover:bg-white/50 transition-all text-sm font-medium text-gray-700"
              >
                ฿{quickAmount}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => {
              setAccountNumber("");
              setAmount("");
              setDescription("");
            }}
            className="flex-1 glass-card px-6 py-3 rounded-xl border border-white/30 
                     hover:bg-white/50 transition-all font-medium text-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !accountNumber || !amount}
            className={`flex-1 backdrop-blur-md px-6 py-3 rounded-xl 
                     border transition-all font-medium text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${
              transactionType === "deposit"
                ? "bg-green-500/80 border-green-400/30 hover:bg-green-600/80"
                : "bg-red-500/80 border-red-400/30 hover:bg-red-600/80"
            }`}
          >
            {loading ? "Processing..." : transactionType === "deposit" ? "Deposit Now" : "Withdraw Now"}
          </button>
        </div>
      </form>

      {/* Transaction Info */}
      <div className="mt-6 p-4 rounded-xl bg-white/20 border border-white/30">
        <div className="flex items-start gap-2">
          <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs text-gray-600">
            {transactionType === "deposit"
              ? "Deposits are usually processed instantly and reflected in your account balance."
              : "Withdrawals may take 1-2 business days to process depending on your bank."}
          </p>
        </div>
      </div>
    </div>
  );
}
