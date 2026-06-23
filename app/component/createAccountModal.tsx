"use client";

import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { createAccount } from "../api/api";
import type { CreateAccountData } from "../api/types";

interface CreateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;

}

export function CreateAccountModal({ isOpen, onClose, onSuccess }: CreateAccountModalProps) {
  const [ownerName, setOwnerName] = useState("");
  const [citizenId, setCitizenId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [accountType, setAccountType] = useState<"SAVING" | "CURRENT">("SAVING");
  const [initialBalance, setInitialBalance] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState("");

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!ownerName.trim()) {
      newErrors.ownerName = "Owner name is required";
    }

    const cleanCitizenId = citizenId.replace(/\D/g, "");
    if (!cleanCitizenId) {
      newErrors.citizenId = "Citizen ID is required";
    } else if (cleanCitizenId.length !== 13) {
      newErrors.citizenId = "Citizen ID must be exactly 13 digits";
    }

    const cleanPhone = phoneNumber.replace(/\D/g, "");
    if (!cleanPhone) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (cleanPhone.length !== 10) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits";
    }

    if (initialBalance === "") {
      newErrors.initialBalance = "Initial balance is required";
    } else {
      const balanceNum = parseFloat(initialBalance);
      if (isNaN(balanceNum) || balanceNum < 0) {
        newErrors.initialBalance = "Initial balance must be a non-negative number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError("");

    if (!validate()) return;

    setLoading(true);
    try {
      const payload: CreateAccountData = {
        owner_name: ownerName.trim(),
        citizen_id: citizenId.replace(/\D/g, ""),
        phone_number: phoneNumber.replace(/\D/g, ""),
        account_type: accountType,
        initial_balance: parseFloat(initialBalance),
      };

      await createAccount(payload);

      // Dispatch custom event to notify other components to refresh
      // window.dispatchEvent(new Event("account-created"));
      onSuccess();

      // Reset form
      setOwnerName("");
      setCitizenId("");
      setPhoneNumber("");
      setAccountType("SAVING");
      setInitialBalance("");
      setErrors({});
      onClose();
    } catch (err: any) {
      console.error(err);
      setGeneralError(err.response?.data?.message || err.message || "Failed to create account");
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
          <div>
            <h3 className="text-lg font-bold text-gray-900">Create New Account</h3>
            <p className="text-xs text-gray-600 mt-0.5">Open a new account with your information</p>
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

        {/* General Error Alert */}
        {generalError && (
          <div className="mb-4 p-3 bg-red-50/80 border border-red-200/50 rounded-xl text-xs text-red-700 font-medium">
            {generalError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 flex-1">
          {/* Owner Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Owner Name
            </label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className={`w-full glass-card px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 text-sm text-gray-900 placeholder-gray-500 transition-all ${errors.ownerName ? "border-red-400 focus:ring-red-400/50" : "border-white/30"
                }`}
            />
            {errors.ownerName && (
              <p className="text-xs text-red-600 mt-1 font-medium">{errors.ownerName}</p>
            )}
          </div>

          {/* Citizen ID */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Citizen ID
            </label>
            <input
              type="text"
              maxLength={13}
              placeholder="13-digit National ID"
              value={citizenId}
              onChange={(e) => setCitizenId(e.target.value.replace(/\D/g, ""))}
              className={`w-full glass-card px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 text-sm text-gray-900 placeholder-gray-500 transition-all ${errors.citizenId ? "border-red-400 focus:ring-red-400/50" : "border-white/30"
                }`}
            />
            {errors.citizenId && (
              <p className="text-xs text-red-600 mt-1 font-medium">{errors.citizenId}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Phone Number
            </label>
            <input
              type="text"
              maxLength={10}
              placeholder="10-digit Mobile Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
              className={`w-full glass-card px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 text-sm text-gray-900 placeholder-gray-500 transition-all ${errors.phoneNumber ? "border-red-400 focus:ring-red-400/50" : "border-white/30"
                }`}
            />
            {errors.phoneNumber && (
              <p className="text-xs text-red-600 mt-1 font-medium">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Account Type (Custom sliding controls like standard dashboard) */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Account Type
            </label>
            <div className="relative glass-card rounded-xl p-1 border border-white/40 flex gap-2">
              {/* Sliding highlight */}
              <div
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-blue-400/80 to-blue-500/80 transition-all duration-200 ease-in-out rounded-lg shadow-md ${accountType === "SAVING"
                  ? "left-1"
                  : "left-[calc(50%+2px)]"
                  }`}
              />
              <button
                type="button"
                onClick={() => setAccountType("SAVING")}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg relative z-10 transition-colors duration-200 ${accountType === "SAVING" ? "text-white" : "text-gray-700 hover:text-gray-900"
                  }`}
              >
                Saving
              </button>
              <button
                type="button"
                onClick={() => setAccountType("CURRENT")}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg relative z-10 transition-colors duration-200 ${accountType === "CURRENT" ? "text-white" : "text-gray-700 hover:text-gray-900"
                  }`}
              >
                Current
              </button>
            </div>
          </div>

          {/* Initial Balance */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Initial Balance (฿)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={initialBalance}
              onChange={(e) => setInitialBalance(e.target.value)}
              className={`w-full glass-card px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 text-sm text-gray-900 placeholder-gray-500 transition-all ${errors.initialBalance ? "border-red-400 focus:ring-red-400/50" : "border-white/30"
                }`}
            />
            {errors.initialBalance && (
              <p className="text-xs text-red-600 mt-1 font-medium">{errors.initialBalance}</p>
            )}
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
              className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 disabled:opacity-75 disabled:pointer-events-none"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
