import { Suspense } from "react";
import { CheckoutSuccessClient } from "./CheckoutSuccessClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Success | SKYE FASHION",
  description: "Your acquisition has been confirmed successfully.",
};

export default function CheckoutSuccessPage() {
  return (
    <Suspense 
      fallback={
        <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center py-48 px-6 text-center">
          <h1 className="font-serif text-2xl uppercase tracking-widest mb-4">Verifying Acquisition</h1>
          <p className="font-sans text-xs text-muted-foreground tracking-widest uppercase">
            Loading order verification page...
          </p>
        </main>
      }
    >
      <CheckoutSuccessClient />
    </Suspense>
  );
}
