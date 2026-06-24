"use client"
import React, { useEffect, useState } from 'react';
import { getAccountList, getAllTransactionsHistrory } from '../api/api';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;

}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  iconColor,
  iconBgColor,

}) => {
  return (
    <div className="glass-card rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>

        </div>
        <div className={`${iconBgColor} backdrop-blur-sm p-3 rounded-xl border border-white/30`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

function Stat(props :{ refreshKey : number}) {
  const [totalAccounts, setTotalAccounts] = useState<number>(0);
  const [totalTransaction , setTotalTransaction] = useState<number>(0)



  const [loading, setLoading] = useState(true);
  async function fetchStatData() {
    try {
        setLoading(false)
      const res = await getAccountList(1);
      const tx= await getAllTransactionsHistrory(1);
      // Use meta.total for total accounts count
      setTotalAccounts(res.meta.total);
      setTotalTransaction(tx.meta.total);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {


    fetchStatData();
  }, [props.refreshKey]);

  const stats = [
    {
      title: 'Total Accounts',
      value: loading ? '...' : totalAccounts,
      iconBgColor: 'bg-blue-100/80',
      iconColor: 'text-blue-600',

      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
   
    {
      title: 'Total Transactions',
      value: loading ? '...' : totalTransaction,
      iconBgColor: 'bg-purple-100/80',
      iconColor: 'text-purple-600',

      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {stats.map((stat, index) => (
        
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}

export default Stat;