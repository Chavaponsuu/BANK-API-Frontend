"use client";

import React, { useState } from "react";
import { X, Loader2, AlertTriangle } from "lucide-react";
import { closeAccount } from "../api/api";

interface CloseAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CloseAccountModal({
  isOpen,
  onClose,
  onSuccess,
}: CloseAccountModalProps) {
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!accountNumber.trim()) {
      setError("Account number is required");
      return;
    }

    setLoading(true);
    try {
      await closeAccount(accountNumber.trim());

      // Reset form & trigger callbacks
      setAccountNumber("");
      onSuccess();
      onClose();
    } catch (err: any) {
      const message = err.response?.data?.message || "Cannot close account";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={loading ? undefined : onClose}
      />

      {/* Modal Container */}
      <div className="glass-panel w-full max-w-md max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-200 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/20">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-red-500" size={20} />
            <div>
              <h3 className="text-lg font-bold text-gray-900">Close Account</h3>
              <p className="text-xs text-gray-600 mt-0.5">
                Permanently close an existing account
              </p>
            </div>
          </div>
          <button
            type="button"
            className="p-1.5 rounded-lg text-gray-500 hover:bg-white/40 hover:text-gray-800 transition-colors"
            onClick={onClose}
            disabled={loading}
          >
            <X size={18} />
          </button>
        </div>

        {/* Warning Text */}
        <div className="mb-4 p-3 bg-amber-50/80 border border-amber-200/50 rounded-xl text-xs text-amber-700 font-medium">
          Warning: Closing an account is permanent and cannot be undone. Make
          sure you have entered the correct account number.
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-50/80 border border-red-200/50 rounded-xl text-xs text-red-700 font-medium animate-in shake">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 flex-1">
          {/* Account Number Field */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Account Number
            </label>
            <input
              type="text"
              placeholder="e.g. 1000000001"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className={`w-full glass-card px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-400/50 focus:border-red-400/50 text-sm text-gray-900 placeholder-gray-500 transition-all ${
                error && !accountNumber
                  ? "border-red-400 focus:ring-red-400/50"
                  : "border-white/30"
              }`}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-2.5 border border-white/30 text-gray-700 hover:text-gray-900 hover:bg-white/40 font-medium text-sm rounded-xl transition-all shadow-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-medium text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 disabled:opacity-75 disabled:pointer-events-none"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Closing...
                </>
              ) : (
                "Close Account"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
