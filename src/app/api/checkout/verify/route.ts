import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPaystackTransaction } from "@/lib/paystack";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get("reference");

    if (!reference) {
      return new NextResponse("Reference query parameter is required", { status: 400 });
    }

    // Retrieve order from database
    const order = await prisma.order.findUnique({
      where: { id: reference },
    });

    if (!order) {
      return new NextResponse("Order not found", { status: 404 });
    }

    // If order is already paid/processing, return early
    if (order.status !== "PENDING") {
      return NextResponse.json({ success: true, status: order.status });
    }

    // For local testing, if the secret key is a placeholder, skip external verification and simulate success
    const isTesting = process.env.PAYSTACK_SECRET_KEY === "sk_test_paystack_placeholder" || !process.env.PAYSTACK_SECRET_KEY;
    
    let paymentSuccess = false;
    
    if (isTesting) {
      paymentSuccess = true;
    } else {
      const paystackData = await verifyPaystackTransaction(reference);
      paymentSuccess = paystackData.status === "success";
    }

    if (paymentSuccess) {
      // Update order status to PROCESSING
      await prisma.order.update({
        where: { id: reference },
        data: { status: "PROCESSING" },
      });

      return NextResponse.json({ success: true, status: "PROCESSING" });
    }

    return NextResponse.json({ success: false, status: "PENDING", message: "Payment not completed" });
  } catch (error: any) {
    console.error("Paystack verification endpoint error:", error);
    return new NextResponse(
      JSON.stringify({ error: error.message || "Payment verification failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
