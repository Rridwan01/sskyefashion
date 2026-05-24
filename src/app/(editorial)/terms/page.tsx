import Link from "next/link";

export const metadata = {
  title: "Terms of Service — SKYE FASHION",
  description: "Terms of service and acquisition agreement for SKYE clientele.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-36 pb-24 px-6 md:px-12 selection:bg-foreground selection:text-background transition-colors duration-500">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header */}
        <section className="space-y-4">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Legal & Compliance</span>
          <h1 className="font-serif text-3xl md:text-5xl uppercase tracking-widest font-light">
            Terms of Service
          </h1>
          <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground border-b border-muted pb-6">
            Last Updated: May 2026
          </p>
        </section>

        {/* Content */}
        <div className="font-sans text-sm tracking-wide leading-relaxed space-y-12 text-foreground/80">
          
          <section className="space-y-4">
            <h2 className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-foreground">1. Acquisition and Providence</h2>
            <p>
              By completing an order or securing an acquisition on the SKYE digital archive, you agree that all items listed are subject to availability. Custom orders, runway releases, and concierge-sourced pieces are handmade or produced in limited-run ateliers, which may affect delivery schedules and lead times.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-foreground">2. Payment & Sandbox Processing</h2>
            <p>
              Purchases are billed in Nigerian Naira (₦). Payments are processed securely via encrypted Paystack links. For testing and sandbox validation periods, real funds will not be debited on sandbox cards, but orders will still generate valid database entries and order tracking records.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-foreground">3. Showroom Appointments and Custom Orders</h2>
            <p>
              Showroom scheduling (Ibadan, NYC SoHo, Paris) is subject to slot availability and verification by our concierge team. Booking an appointment does not guarantee a showroom slot until confirmed via email or WhatsApp contact from a SKYE representative.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-foreground">4. Custom Concierge Sourcing</h2>
            <p>
              Our concierge sourcing services operate under a custom consultation model. Sourcing requests submitted through the digital portal represent expressions of interest. Our team will verify and communicate the feasibility, timeline, and exact pricing structure of each request prior to final acquisition.
            </p>
          </section>

        </div>

        {/* Action Exit Path */}
        <div className="pt-12 border-t border-muted flex justify-start">
          <Link 
            href="/shop" 
            className="font-sans text-xs uppercase tracking-[0.2em] border-b border-foreground/30 hover:border-foreground transition-all pb-1"
          >
            Browse Active Catalog
          </Link>
        </div>

      </div>
    </main>
  );
}
