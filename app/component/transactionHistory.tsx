"use client"

import { useEffect, useState } from "react";
import { PaginationUi } from "./pagination";
import { Transaction } from "../api/types";
import { getAllTransactionsHistrory, getTransactionsHistrory } from "../api/api";

export function TransactionHistory(props:{refreshKey:number}) {
  const [transactionList, setTransactionList] = useState<Transaction[]>([]);
  const [accountNumberFilter, setAccountNumberFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  

  const totalPages = Math.ceil(total / perPage);
  async function fetchData() {
      setLoading(true);
      try {
        let res;
        if (accountNumberFilter.trim() !== "") {
          res = await getTransactionsHistrory(accountNumberFilter.trim(), page);
        } else {
          res = await getAllTransactionsHistrory(page);
          console.log(res)
        }
        setTransactionList(res.transactionList);
        setPage(res.meta.page);
        setTotal(res.meta.total);
        setPerPage(res.meta.per_page);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    }
   

  useEffect(() => {
     fetchData();
    
  }, [page, accountNumberFilter, props.refreshKey]);

  function handleSearch() {
    setPage(1); // reset to page 1 on new search
    setAccountNumberFilter(searchInput);
  }

  function handleClear() {
    setSearchInput("");
    setAccountNumberFilter("");
    setPage(1);
  }

  if (loading) {
    return (
      <div className="glass-card rounded-2xl p-5 shadow-md relative overflow-hidden">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-600">Loading transactions...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-5 shadow-md relative overflow-hidden">
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
          <p className="text-sm text-gray-600">
            {accountNumberFilter
              ? `Showing ${total} transaction(s) for account ${accountNumberFilter}`
              : `View all ${total} transactions`}
          </p>
        </div>

        {/* Filter Section */}
      <div className="flex items-center gap-3">
  {/* Input */}
  <input
    type="text"
    value={searchInput}
    onChange={(e) => setSearchInput(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
    placeholder="Enter account number..."
    className="glass-card px-4 py-2 rounded-xl border border-white/30 
               focus:outline-none focus:ring-2 focus:ring-blue-400/50 
               text-gray-900 text-sm transition-all w-64"
  />

  {/* Search Button */}
  <button
    onClick={handleSearch}
    className="glass-card px-4 py-2 rounded-xl border border-white/30 
               hover:bg-white/50 transition-all text-sm font-medium 
               text-gray-700 flex items-center gap-2"
  >
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
    </svg>
    Search
  </button>

  {/* Clear Button */}
  {accountNumberFilter && (
    <button
      onClick={handleClear}
      className="glass-card px-4 py-2 rounded-xl border border-white/30 
                 hover:bg-white/50 transition-all text-sm font-medium 
                 text-gray-700 flex items-center gap-2"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M6 18L18 6M6 6l12 12" />
      </svg>
      Clear
    </button>
  )}
</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-center align-middle">
          <thead>
            <tr className="border-b-2 border-white/40 bg-white/20">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Transaction ID</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Timestamp</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Description</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
              {/* <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Balance</th> */}
            </tr>
          </thead>
          <tbody>
            {transactionList.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-600">
                  {accountNumberFilter
                    ? `No transactions found for account ${accountNumberFilter}`
                    : "No transactions found"}
                </td>
              </tr>
            ) : (
              transactionList.map((txn) => (
                <tr
                  key={txn.transaction_ref}
                  className="border-b border-white/20 hover:bg-white/30 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-gray-900">{txn.transaction_ref}</td>
                  <td className="py-3 px-4 text-gray-800 text-sm">{new Date(txn.created_at).toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-800">{txn.description === "" ? "-" : txn.description}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      txn.transaction_type === "DEPOSIT"
                        ? "bg-green-100/80 text-green-700 border border-green-200/50"
                        : "bg-red-100/80 text-red-700 border border-red-200/50"
                    }`}>
                      {txn.transaction_type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-semibold ${txn.transaction_type === "DEPOSIT" ? "text-green-600" : "text-red-600"}`}>
                      {txn.transaction_type === "DEPOSIT" ? "+" : "-"} ฿{txn.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </td>
                  {/* <td className="py-3 px-4 text-right font-semibold text-gray-900">
                    ฿{txn.balance_after.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>

        <PaginationUi page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
}

export default TransactionHistory;