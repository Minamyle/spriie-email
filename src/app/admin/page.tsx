"use client";

import { useState } from "react";

export default function AdminPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");

  const sendTestEmail = async () => {
    await fetch("/api/send-email", {
      method: "POST",
      body: JSON.stringify({
        type: "admin",
        orderId,
        email,
      }),
    });
    alert("Email sent!");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Send Admin Order Email</h2>
      <input
        type="text"
        placeholder="Order ID"
        className="border p-2 w-full mb-2"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
      <input
        type="email"
        placeholder="Admin Email"
        className="border p-2 w-full mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={sendTestEmail}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Send Email
      </button>
    </div>
  );
}
