const BASE_URL = "https://spriie.com";

const container = `
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #FAFAF5;
  padding: 40px 0;
  margin: 0;
  color: #111827;
`;

const contentBox = `
  background-color: #ffffff;
  max-width: 480px;
  margin: auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
`;

const header = `
  background-color: #10B981
;
  color: #ffffff;
  padding: 32px 20px;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
`;

const section = `
  padding: 32px 24px;
  text-align: center;
`;

const paragraph = `
  font-size: 17px;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const button = `
  display: inline-block;
  padding: 12px 24px;
  background-color: #10B981
;
  color: #ffffff;
  text-decoration: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  margin: 20px 0;
`;

const footer = `
  background-color: #10B981
;
  color: #ffffff;
  text-align: center;
  padding: 20px;
  font-weight: 600;
  font-size: 16px;
`;


const h2Style = "font-size: 20px; color: #1f2937; margin-bottom: 16px;";
const pStyle = "margin-bottom: 12px; font-size: 16px; line-height: 1.5;";
const linkStyle = "color: #3b82f6; text-decoration: underline; font-weight: 500;";

export function adminOrderReceivedEmail(orderId: string) {
  return {
    subject: "New Order Received",
    html: `
      <div style="${container}">
        <div style="${contentBox}">
          <div style="${header}">New Order Received</div>
          <div style="${section}">
            <p style="${paragraph}">An order with ID <strong>ORD-${orderId}</strong> has been placed.</p>
            <a href="${BASE_URL}/admin/orders/${orderId}" style="${button}">View Dashboard</a>
            <p style="font-size: 15px; color: #6B7280;">
              Click the button to manage the order in your admin dashboard.
            </p>
          </div>
          <div style="${footer}">Spriie</div>
        </div>
      </div>
    `,
  };
}


export function sellerOrderPlacedEmail(orderId: string, sellerName: string) {
  return {
    subject: "You Have a New Order!",
    html: `
      <div style="${container}">
        <div style="${contentBox}">
          <div style="${header}">New Order Received</div>
          <div style="${section}">
            <p style="${paragraph}">Hello <strong>${sellerName}</strong>,</p>
            <p style="${paragraph}">You just received a new order with ID <strong>ORD-${orderId}</strong>.</p>
            <a href="${BASE_URL}/seller/orders/${orderId}" style="${button}">View Dashboard</a>
            <p style="font-size: 15px; color: #6B7280;">
              Click the button to view the order details in your seller dashboard.
            </p>
          </div>
          <div style="${footer}">Spriie</div>
        </div>
      </div>
    `,
  };
}


export function sellerOrderStatusUpdateEmail(
  orderId: string,
  status: "shipped" | "delivered" | "cancelled",
  reason?: string
) {
  let extraContent = "";

  if (status === "cancelled" && reason) {
    extraContent = `<p style="${paragraph}"><strong>Reason:</strong> ${reason}</p>`;
  }

  if (status === "delivered") {
    extraContent += `
      <p style="${paragraph}">
        <a href="${BASE_URL}/review/${orderId}" style="color: #134E4A; text-decoration: underline;">Leave a Review</a>
      </p>
      <p style="${paragraph}">
        <a href="${BASE_URL}/returns/${orderId}" style="color: #134E4A; text-decoration: underline;">
          Return Product (valid for 24 hours)
        </a>
      </p>
    `;
  }

  return {
    subject: `Order #${orderId} Status Updated: ${status.toUpperCase()}`,
    html: `
      <div style="${container}">
        <div style="${contentBox}">
          <div style="${header}">Order Status: ${status.charAt(0).toUpperCase() + status.slice(1)}</div>
          <div style="${section}">
            <p style="${paragraph}">Your order with ID <strong>ORD-${orderId}</strong> has been updated to <strong>${status}</strong>.</p>
            ${extraContent}
            <a href="${BASE_URL}/seller/orders/${orderId}" style="${button}">View Order</a>
          </div>
          <div style="${footer}">Spriie</div>
        </div>
      </div>
    `,
  };
}


export function sellerReturnRequestEmail(
  orderId: string,
  buyerName: string,
  reason: string
) {
  return {
    subject: `Return Request for Order #${orderId}`,
    html: `
      <div style="${container}">
        <div style="${contentBox}">
          <div style="${header}">Return Requested</div>
          <div style="${section}">
            <p style="${paragraph}">${buyerName} has requested to return an item from order <strong>ORD-${orderId}</strong>.</p>
            <p style="${paragraph}"><strong>Reason:</strong> ${reason}</p>
            <a href="${BASE_URL}/seller/orders/${orderId}" style="${button}">Review Request</a>
          </div>
          <div style="${footer}">Spriie</div>
        </div>
      </div>
    `,
  };
}
