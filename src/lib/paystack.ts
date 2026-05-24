export interface PaystackInitResponse {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export async function initializePaystackTransaction({
  email,
  amountNGN,
  reference,
  callbackUrl,
}: {
  email: string;
  amountNGN: number;
  reference: string;
  callbackUrl: string;
}): Promise<PaystackInitResponse> {
  // Paystack expects amount in Kobo (e.g., Naira * 100)
  const amountKobo = Math.round(amountNGN * 100);
  const secretKey = process.env.PAYSTACK_SECRET_KEY || "sk_test_paystack_placeholder";

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount: amountKobo,
      currency: "NGN",
      reference,
      callback_url: callbackUrl,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Paystack transaction initialization failed: ${errText}`);
  }

  const result = await res.json();
  
  if (!result.status) {
    throw new Error(`Paystack error: ${result.message}`);
  }

  return result.data;
}

export async function verifyPaystackTransaction(reference: string) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY || "sk_test_paystack_placeholder";

  const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${secretKey}`,
    },
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Paystack transaction verification failed: ${errText}`);
  }

  const result = await res.json();
  
  if (!result.status) {
    throw new Error(`Paystack verification failed: ${result.message}`);
  }

  return result.data;
}
