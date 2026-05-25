"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useActionState } from "react";
import { authenticate } from "@/app/actions/auth";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [errorMessage, dispatch] = useActionState(authenticate, undefined);

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center pt-24 pb-12 px-6">
      
      <div className="w-full max-w-md space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="font-serif text-3xl md:text-4xl uppercase tracking-widest font-light">Client Access</h1>
          <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
            Enter your credentials to access your collection.
          </p>
        </div>

        {/* Form */}
        <form action={dispatch} className="space-y-12">
          
          {errorMessage && (
            <div className="text-red-500 font-sans text-xs tracking-widest uppercase text-center">
              {errorMessage}
            </div>
          )}
          
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
            <span className="font-sans text-sm tracking-[0.2em] uppercase">Sign In</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
          </button>
        </form>

        <div className="space-y-6 pt-6">
          <button 
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full py-4 border border-foreground/10 rounded-md font-sans text-xs tracking-[0.2em] uppercase hover:bg-foreground/5 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Footer */}
        <div className="text-center space-y-6 pt-12 border-t border-muted">
          <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground">
            Do not have an account?
          </p>
          <Link href="/auth/register" className="inline-block font-sans text-xs tracking-[0.2em] uppercase border-b border-muted-foreground hover:border-foreground hover:text-foreground transition-colors pb-1">
            Apply for Access
          </Link>
        </div>

      </div>
    </main>
  );
}
