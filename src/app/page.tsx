// src/app/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { sendAdminOrderEmail } from "../../src/lib/email";
import { toast } from "react-hot-toast";

export default function HomePage() {
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);

  // src/app/page.tsx
  const handleSend = async () => {
    if (!orderId) return toast.error("Order ID is required");
    setLoading(true);
    try {
      const res = await sendAdminOrderEmail({
        type: "admin-order",
        to: "minamyle@gmail.com",
        data: {
          orderId: orderId,
        },
      });
      toast.success("Email sent successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Send Admin Order Email</h1>
        <input
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4"
        />
        <Button disabled={loading} onClick={handleSend} className="w-full">
          {loading ? "Sending..." : "Send Email"}
        </Button>
      </div>
    </main>
  );
}
