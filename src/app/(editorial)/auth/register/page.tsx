import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center pt-24 pb-12 px-6">
      
      <div className="w-full max-w-md space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="font-serif text-3xl md:text-4xl uppercase tracking-widest font-light">Apply for Access</h1>
          <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
            Join the SKYE clientele to unlock exclusive concierge services and track your collection.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-12">
          
          <div className="relative group">
            <input 
              type="text" 
              name="name" 
              required
              placeholder="Full Name"
              className="w-full bg-transparent border-b border-muted py-4 font-sans text-sm tracking-widest uppercase focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
            />
          </div>

          <div className="relative group">
            <input 
              type="email" 
              name="email" 
              required
              placeholder="Email Address"
              className="w-full bg-transparent border-b border-muted py-4 font-sans text-sm tracking-widest uppercase focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
            />
          </div>

          <div className="relative group">
            <input 
              type="password" 
              name="password" 
              required
              placeholder="Password"
              className="w-full bg-transparent border-b border-muted py-4 font-sans text-sm tracking-widest uppercase focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
            />
          </div>

          <button 
            type="submit"
            className="w-full flex items-center justify-between py-6 border-b border-foreground group hover:opacity-70 transition-opacity"
          >
            <span className="font-sans text-sm tracking-[0.2em] uppercase">Submit Application</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
          </button>
        </form>

        {/* Footer */}
        <div className="text-center space-y-6 pt-12 border-t border-muted">
          <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground">
            Already a client?
          </p>
          <Link href="/auth/signin" className="inline-block font-sans text-xs tracking-[0.2em] uppercase border-b border-muted-foreground hover:border-foreground hover:text-foreground transition-colors pb-1">
            Access Portal
          </Link>
        </div>

      </div>
    </main>
  );
}
