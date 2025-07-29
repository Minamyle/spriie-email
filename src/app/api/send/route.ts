import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import {
  adminOrderReceivedEmail,
  sellerOrderPlacedEmail,
  sellerOrderStatusUpdateEmail, 
  sellerReturnRequestEmail,
} from "@/lib/email-templates";

export async function POST(req: Request) {
  const body = await req.json();
  const { type, to, data } = body;

  try {
    let emailContent;

    switch (type) {
      case "admin-order":
        emailContent = adminOrderReceivedEmail(data.orderId);
        break;
     case "seller-order":
  emailContent = sellerOrderPlacedEmail(data.orderId, data.sellerName); 
  break;

      case "seller-status":
        emailContent = sellerOrderStatusUpdateEmail(data.orderId, data.status, data.reason); 
        break;
      case "seller-return":
  emailContent = sellerReturnRequestEmail(data.orderId, data.buyerName, data.reason); 
  break;
      default:
        return NextResponse.json({ error: "Invalid email type" }, { status: 400 });
    }

    // Send email
    await resend.emails.send({
      from: "Spriie <contact@spriie.com>",
      to,
      subject: emailContent.subject,
      html: emailContent.html,
    });

    // Subscribe contact
    await resend.contacts.create({
      email: to,
      unsubscribed: false,
      audienceId: "045c6c19-ba2a-41f6-8cef-2b1db18df75c",
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error sending email:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
