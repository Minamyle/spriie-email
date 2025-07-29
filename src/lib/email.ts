// lib/email.ts
export const sendAdminOrderEmail = async (payload: {
  type: "admin-order" | "seller-order" | "seller-status" | "seller-return";
  to: string;
  data: {
    orderId: string;
    status?: string;
    reason?: string;
  };
}) => {
  const response = await fetch("/api/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to send email");
  }

  return response.json();
};
