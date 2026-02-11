"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function TransactionForm() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await api.post("/transactions", {
        amount: Number(amount),
        description,
      });

      setCategory(res.data.category);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white text-black shadow rounded-lg my-20">
      <h2 className="text-xl font-bold mb-4">Add Transaction</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Amount"
          className="w-full p-2 border rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          {`${loading ? "loading..." : "Submit"}`}
        </button>
      </form>

      {category && (
        <p className="mt-4 text-green-600">AI Category: {category}</p>
      )}
    </div>
  );
}