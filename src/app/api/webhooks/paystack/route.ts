import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-paystack-signature");

    if (!signature) {
      console.warn("Paystack Webhook: Missing signature header");
      return new NextResponse("Missing signature header", { status: 400 });
    }

    const secret = process.env.PAYSTACK_SECRET_KEY || "sk_test_paystack_placeholder";
    
    // Verify payload signature
    const hash = crypto
      .createHmac("sha512", secret)
      .update(rawBody)
      .digest("hex");

    const isTesting = secret === "sk_test_paystack_placeholder";

    if (!isTesting && hash !== signature) {
      console.warn("Paystack Webhook: Signature verification failed");
      return new NextResponse("Invalid signature", { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const eventType = payload.event;
    const eventData = payload.data;

    console.log(`Paystack Webhook Received event: ${eventType} reference: ${eventData?.reference}`);

    if (eventType === "charge.success") {
      const reference = eventData.reference;
      const status = eventData.status;

      if (status === "success" && reference) {
        // Retrieve and update order from the database
        const order = await prisma.order.findUnique({
          where: { id: reference },
        });

        if (order) {
          if (order.status === "PENDING") {
            await prisma.order.update({
              where: { id: reference },
              data: { status: "PROCESSING" },
            });
            console.log(`Paystack Webhook: Order ${reference} updated to PROCESSING successfully.`);
          } else {
            console.log(`Paystack Webhook: Order ${reference} was already in status: ${order.status}`);
          }
        } else {
          console.warn(`Paystack Webhook: Order reference ${reference} not found in database`);
        }
      }
    }

    return new NextResponse("Webhook processed successfully", { status: 200 });
  } catch (error: any) {
    console.error("Paystack Webhook Error:", error);
    return new NextResponse(
      JSON.stringify({ error: error.message || "Webhook processing failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
