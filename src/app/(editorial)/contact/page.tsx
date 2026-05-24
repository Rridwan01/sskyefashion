import { Metadata } from "next";
import { ContactClient } from "@/components/contact/ContactClient";

export const metadata: Metadata = {
  title: "Showroom Booking & Contact",
  description: "Schedule a private consultation at our Ibadan, NYC, or Paris ateliers, or send an inquiry to the SKYE digital office.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-32 md:pt-48 pb-32 px-6 md:px-12">
      <div className="max-w-[1600px] mx-auto space-y-16">
        
        {/* Page Title */}
        <section className="space-y-4 text-center lg:text-left">
          <h1 className="font-serif text-4xl md:text-7xl font-light uppercase tracking-[0.1em]">
            Connect
          </h1>
          <p className="font-sans text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Schedule a private consultation or reach out to our global team.
          </p>
        </section>

        {/* Form Client */}
        <ContactClient />

      </div>
    </main>
  );
}
