import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — SKYE FASHION",
  description: "Bespoke privacy policy and client data agreement for SKYE clientele.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-36 pb-24 px-6 md:px-12 selection:bg-foreground selection:text-background transition-colors duration-500">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header */}
        <section className="space-y-4">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Legal & Security</span>
          <h1 className="font-serif text-3xl md:text-5xl uppercase tracking-widest font-light">
            Privacy Policy
          </h1>
          <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground border-b border-muted pb-6">
            Last Updated: May 2026
          </p>
        </section>

        {/* Content */}
        <div className="font-sans text-sm tracking-wide leading-relaxed space-y-12 text-foreground/80">
          
          <section className="space-y-4">
            <h2 className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-foreground">1. Acquisition of Client Data</h2>
            <p>
              We collect information directly provided by you during account creation, showroom appointments scheduling, concierge sourcing requests, or general inquiries. This data includes your name, email address, phone number, shipping address, customized sizing parameters, and style preferences.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-foreground">2. Sourcing and Concierge Sourcing</h2>
            <p>
              Any image references, dimensions, or design specification files you upload via our digital concierge request forms are stored securely on remote cloud infrastructures (such as Cloudinary). These files are strictly used by our internal atelier team to evaluate, verify, and source custom runway pieces or bespoke streetwear items on your behalf.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-foreground">3. Processing of Financial Transactions</h2>
            <p>
              All purchases made via the SKYE digital checkout terminal are routed securely through our payment gateway partners (Paystack / Stripe). SKYE does not process or retain your credit card numbers, CVV codes, or bank details on our local database. Paystack manages transaction security compliance in accordance with global financial standards.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-foreground">4. Data Providence and Control</h2>
            <p>
              Your data will never be sold, shared, or distributed to external marketing brokers. We retain client records solely to guarantee providence documentation for your curated items and to facilitate long-term support for your runway acquisitions. You may request the deletion of your account at any time by contacting our digital concierge.
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
