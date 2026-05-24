import Link from "next/link";
import { X } from "lucide-react";

export default function CheckoutCancelPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center py-48 px-6 text-center">
      <div className="w-16 h-16 rounded-full border border-foreground/20 flex items-center justify-center mb-8">
        <X className="w-8 h-8" />
      </div>
      <h1 className="font-serif text-4xl md:text-6xl font-light uppercase tracking-widest mb-6">
        Order Cancelled
      </h1>
      <p className="font-sans text-sm md:text-base text-muted-foreground tracking-widest uppercase max-w-lg mb-16">
        The transaction was not completed. Your items remain in your bag should you choose to proceed later.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-8 items-center">
        <Link 
          href="/shop"
          className="font-sans text-xs uppercase tracking-[0.2em] pb-2 border-b border-foreground hover:text-muted-foreground hover:border-muted-foreground transition-colors"
        >
          Return to Archive
        </Link>
      </div>
    </main>
  );
}
