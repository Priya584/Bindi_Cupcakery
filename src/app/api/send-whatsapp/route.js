import { auth, currentUser } from "@clerk/nextjs/server";
import twilio from "twilio";
import cloudinary from "cloudinary";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromWhatsApp = process.env.TWILIO_WHATSAPP_NUMBER;
const toWhatsApp = process.env.BUSINESS_OWNER_WHATSAPP;

const client = twilio(accountSid, authToken);

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload QR Code to Cloudinary
async function uploadToCloudinary(base64Image) {
  try {
    const uploadResponse = await cloudinary.v2.uploader.upload(base64Image, {
      folder: "bindi_cupcakery",
    });
    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
}

export async function POST(req) {
  try {
    const user = await currentUser();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get User's Phone Number
    const userPhone = user?.primaryPhoneNumber?.phoneNumber || "No phone number available";

    const { orderDetails, qrCode } = await req.json();

    // Upload QR Code
    const qrCodeUrl = await uploadToCloudinary(qrCode);
    if (!qrCodeUrl) {
      return Response.json({ error: "Failed to upload QR code" }, { status: 500 });
    }

    // Format order details
    const formattedOrder = orderDetails
      .map((item, index) => `${index + 1}. *${item.title}* - ₹${item.price}`)
      .join("\n");

    // Construct WhatsApp message with user phone number
    const message = `
🛒 *New Order Received!*
📞 *Customer Phone:* ${userPhone}
📋 *Order Details:*
${formattedOrder}

💰 *Total Amount:* ₹${orderDetails.reduce((acc, item) => acc + item.price, 0)}

🔗 *UPI Payment QR:* ${qrCodeUrl}
`;

    const userMessage = `
✅ *Order Placed Successfully!*
🎉 Thank you for your order! Our team will confirm it soon.

📋 *Your Order Details:*
${formattedOrder}

💰 *Total Amount:* ₹${orderDetails.reduce((acc, item) => acc + item.price, 0)}

🔗 *UPI Payment QR:* ${qrCodeUrl}

📞 Need help? Reply to this message.
`;
    // Send WhatsApp message
    await client.messages.create({
      from: fromWhatsApp,
      to: toWhatsApp,
      body: message,
    });

    await client.messages.create({
      from: fromWhatsApp,
      to: `whatsapp:${userPhone}`, // User's WhatsApp number
      body: userMessage,
    });
    return Response.json({ success: "Order message sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Twilio Error:", error);
    return Response.json({ error: "Failed to send order message." }, { status: 500 });
  }
}
