import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/server/auth";
import { initializePaystackTransaction } from "@/lib/paystack";

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return new NextResponse("No items in request", { status: 400 });
    }

    // Retrieve active session or fallback to guest account
    const session = await auth();
    const email = session?.user?.email || "guest_checkout@skye.com";
    const userId = session?.user?.id;

    let targetUserId = userId;

    if (!targetUserId) {
      // Find or create Guest Client to respect foreign key constraints
      const guestUser = await prisma.user.upsert({
        where: { email: "guest_checkout@skye.com" },
        update: {},
        create: {
          name: "Guest Client",
          email: "guest_checkout@skye.com",
          role: "CUSTOMER",
        },
      });
      targetUserId = guestUser.id;
    }

    // Calculate total order amount
    const totalAmount = items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);

    // Create a PENDING order in the database
    const order = await prisma.order.create({
      data: {
        userId: targetUserId,
        status: "PENDING",
        totalAmount,
      },
    });

    const origin = req.headers.get("origin") || "http://localhost:3003";

    const isTesting = process.env.PAYSTACK_SECRET_KEY === "sk_test_paystack_placeholder" || !process.env.PAYSTACK_SECRET_KEY;

    if (isTesting) {
      // For local development with placeholder keys, redirect directly to success callback to test verification flow
      return NextResponse.json({ url: `${origin}/checkout/success?reference=${order.id}` });
    }

    // Initialize Paystack transaction using NGN currency
    const paystackSession = await initializePaystackTransaction({
      email,
      amountNGN: totalAmount,
      reference: order.id,
      callbackUrl: `${origin}/checkout/success`,
    });

    return NextResponse.json({ url: paystackSession.authorization_url });
  } catch (error: any) {
    console.error("Paystack checkout error:", error);
    return new NextResponse(
      JSON.stringify({ error: error.message || "Internal payment checkout error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
