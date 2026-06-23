"use client";


import { Wallet, Bell, User } from "lucide-react";


function Header() {


  return (
    <>
      <div className="glass-card rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <div className="glass-card backdrop-blur-md rounded-xl p-2 shadow-sm border border-white/30">
            <Wallet className="text-gray-800" size={24} />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              Bank API Dashboard
            </h1>
            <p className="text-xs text-gray-700">Manage your banking operations</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
         
          <button className="glass-card p-2 hover:bg-white/50 rounded-xl transition-all border border-white/30 cursor-pointer">
            <Bell className="h-5 w-5 text-gray-800" />
          </button>
          <button className="glass-card p-2 hover:bg-white/50 rounded-xl transition-all border border-white/30 cursor-pointer">
            <User className="h-5 w-5 text-gray-800" />
          </button>
        </div>
      </div>

   
    </>
  );
}

export default Header;
