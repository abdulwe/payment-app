"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function FundWallet() {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState<number | null>(null);

  const handleFund = async () => {
    try {
      const res = await api.post("/wallet/fund", {
        amount: Number(amount),
      });

      setBalance(res.data.balance);
      setAmount("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white text-black shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">Fund Wallet</h2>

      <input
        type="number"
        placeholder="Enter amount"
        className="w-full border p-2 rounded mb-4"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        onClick={handleFund}
        className="w-full bg-green-600 text-white p-2 rounded"
      >
        Add Money
      </button>

      {balance !== null && (
        <p className="mt-4 font-semibold">New Balance: ₦{balance}</p>
      )}
    </div>
  );
}