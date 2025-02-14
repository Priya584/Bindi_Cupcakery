import * as QRCode from "qrcode";

export async function POST(req) {
  try {
    const { amount, upiId } = await req.json();

    if (!amount || !upiId) {
      return new Response(JSON.stringify({ error: "Missing required parameters" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // UPI Payment String
    const upiString = `upi://pay?pa=${upiId}&pn=Business&am=${amount}&cu=INR`;

    // Generate QR Code
    const qrCode = await QRCode.toDataURL(upiString);

    return new Response(JSON.stringify({ qrCode }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("QR Code Generation Error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate QR" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
