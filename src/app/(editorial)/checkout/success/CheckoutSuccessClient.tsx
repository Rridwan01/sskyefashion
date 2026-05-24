"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { Check, Loader2, AlertCircle } from "lucide-react";

export function CheckoutSuccessClient() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference") || searchParams.get("trxref");
  const { clearCart } = useCartStore();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const verificationAttempted = useRef(false);

  useEffect(() => {
    // If no reference in query parameters, assume manual redirect or mock payment confirmation
    if (!reference) {
      setLoading(false);
      clearCart();
      return;
    }

    // Avoid duplicate verification runs on React StrictMode mounts
    if (verificationAttempted.current) return;
    verificationAttempted.current = true;

    async function verifyPayment() {
      try {
        const res = await fetch(`/api/checkout/verify?reference=${encodeURIComponent(reference || "")}`);
        
        if (!res.ok) {
          throw new Error("Could not verify your payment transaction. Please contact concierge support.");
        }
        
        const data = await res.json();
        
        if (data.success) {
          setOrderStatus(data.status);
          clearCart();
        } else {
          setError(data.message || "Payment verification failed.");
        }
      } catch (err: any) {
        setError(err.message || "Internal network error while verifying transaction.");
      } finally {
        setLoading(false);
      }
    }

    verifyPayment();
  }, [reference, clearCart]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center py-48 px-6 text-center">
        <Loader2 className="w-10 h-10 animate-spin text-muted-foreground mb-8" />
        <h1 className="font-serif text-2xl uppercase tracking-widest mb-4">Verifying Acquisition</h1>
        <p className="font-sans text-xs text-muted-foreground tracking-widest uppercase max-w-sm">
          Please wait while we verify your transaction reference: <span className="text-foreground">{reference}</span>
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center py-48 px-6 text-center">
        <div className="w-16 h-16 rounded-full border border-red-500/20 flex items-center justify-center mb-8">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="font-serif text-3xl font-light uppercase tracking-widest mb-6 text-red-500">
          Payment Error
        </h1>
        <p className="font-sans text-sm text-muted-foreground tracking-widest uppercase max-w-lg mb-16">
          {error}
        </p>
        <Link 
          href="/shop"
          className="font-sans text-xs uppercase tracking-[0.2em] pb-2 border-b border-foreground hover:text-muted-foreground hover:border-muted-foreground transition-colors"
        >
          Return to Archive
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center py-48 px-6 text-center animate-in fade-in duration-700">
      <div className="w-16 h-16 rounded-full border border-foreground/20 flex items-center justify-center mb-8 bg-foreground/5">
        <Check className="w-8 h-8" />
      </div>
      <h1 className="font-serif text-4xl md:text-6xl font-light uppercase tracking-widest mb-6">
        Order Confirmed
      </h1>
      <p className="font-sans text-sm md:text-base text-muted-foreground tracking-widest uppercase max-w-lg mb-16">
        Your acquisition has been secured. Our concierge team will contact you shortly regarding shipping and providence documentation.
      </p>
      
      {reference && (
        <div className="font-sans text-[10px] tracking-widest text-muted-foreground uppercase mb-16 bg-muted/30 px-6 py-3 rounded border border-muted">
          Reference: <span className="text-foreground font-mono">{reference}</span>
        </div>
      )}

      <Link 
        href="/shop"
        className="font-sans text-xs uppercase tracking-[0.2em] pb-2 border-b border-foreground hover:text-muted-foreground hover:border-muted-foreground transition-colors"
      >
        Return to Archive
      </Link>
    </main>
  );
}
