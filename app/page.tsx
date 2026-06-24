"use client";
import Header from "./component/header";
import Stat from "./component/stat";
import { Transaction } from "./component/transaction";
import AccountList from "./component/accountList";
import TransactionHistory from "./component/transactionHistory";
import { useState } from "react";
export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const onSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };
  return (
    <div className="min-h-screen" style={{ background: "#eef2ff" }}>
      <div className="container mx-auto px-4 py-6 space-y-6">
        <Header />

        <Stat refreshKey={refreshKey} />
        <AccountList onSuccess={onSuccess} />
        <div className="flex justify-between align-middle gap-3">
          <Transaction onSuccess={onSuccess} />
          <TransactionHistory refreshKey={refreshKey} />
        </div>
      </div>
    </div>
  );
}
