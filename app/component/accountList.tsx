"use client";
import { useEffect, useState } from "react";
import { getAccountList } from "../api/api";
import { Account } from "../api/types";
import { PaginationUi } from "./pagination";
import { Metadata } from "next";
import { CreateAccountModal } from "./createAccountModal";
import { CloseAccountModal } from "./closeAccountModal";

export function AccountList(props: { onSuccess: () => void }) {
  // const [trigger, setTrigger] = useState(0);
  const [accountList, setAccountList] = useState<Account[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  async function fetchData(page: number) {
    try {
      const res = await getAccountList(page);
      setAccountList(res.accountList);

      // console.log(res.meta)
      setTotal(res.meta.total);
      setPerPage(res.meta.per_page);
      props.onSuccess();
    } catch (error) {
      console.error("Error fetching accounts:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const totalBalance = accountList.reduce((sum, acc) => sum + acc.balance, 0);
  const totalPages = Math.ceil(total / perPage);
  //    console.log(totalPages)

  if (loading) {
    return (
      <div className="glass-card rounded-2xl p-5 shadow-md relative overflow-hidden">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-600">Loading accounts...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-5 shadow-md relative overflow-hidden">
      <div className="mb-4 flex justify-between p-2">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Account List</h2>
          <p className="text-sm text-gray-600">
            A list of all your bank accounts
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 text-sm font-medium rounded-xl 
               bg-white/30 backdrop-blur-md 
               border border-white/40 
               text-gray-800 
               hover:bg-white/50 hover:shadow-md
               transition-all"
          >
            + Create Account
          </button>

          <button
            onClick={() => setIsCloseModalOpen(true)}
            className="px-4 py-2 text-sm font-medium rounded-xl 
               bg-white/30 backdrop-blur-md 
               border border-white/40 
               text-gray-800 
               hover:bg-white/50 hover:shadow-md
               transition-all"
          >
            Close Account
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/30">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Account No.
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Owner
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Type
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                Balance
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {accountList.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-600">
                  No accounts found
                </td>
              </tr>
            ) : (
              accountList.map((acc) => (
                <tr
                  key={acc.account_number}
                  className="border-b border-white/20 hover:bg-white/30 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-gray-900">
                    {acc.account_number}
                  </td>
                  <td className="py-3 px-4 text-gray-800">{acc.owner_name}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        acc.account_type === "SAVING"
                          ? "bg-blue-100/80 text-blue-700 border border-blue-200/50"
                          : "bg-purple-100/80 text-purple-700 border border-purple-200/50"
                      }`}
                    >
                      {acc.account_type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">
                    $
                    {acc.balance.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        acc.status === "ACTIVE"
                          ? "bg-green-100/80 text-green-700 border border-green-200/50"
                          : "bg-red-100/80 text-red-700 border border-red-200/50"
                      }`}
                    >
                      {acc.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot className="border-t-2 border-white/40">
            <tr>
              <td colSpan={3} className="py-4 px-4 font-semibold text-gray-900">
                Total Balance
              </td>
              <td className="py-4 px-4 text-right font-bold text-gray-900 text-lg">
                $
                {totalBalance.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td className="py-4 px-4"></td>
            </tr>
          </tfoot>
        </table>
        <PaginationUi page={page} setPage={setPage} totalPages={totalPages} />
      </div>
      <CreateAccountModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => fetchData(page)}
      />
      <CloseAccountModal
        isOpen={isCloseModalOpen}
        onClose={() => setIsCloseModalOpen(false)}
        onSuccess={() => fetchData(page)}
      />
    </div>
  );
}

export default AccountList;
