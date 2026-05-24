"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/auth/signin" })}
      className="font-sans text-[10px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
    >
      Sign Out
    </button>
  );
}
