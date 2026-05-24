"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export function SignatureFooter() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".footer-logo",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 0.1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-background text-foreground pt-24 pb-12 px-6 md:px-12 overflow-hidden flex flex-col items-center border-t border-foreground/10 transition-colors duration-500">
      
      <div className="w-full max-w-[1600px] flex flex-col md:flex-row justify-between items-start md:items-end z-10 mb-24 gap-12">
        <div className="flex flex-col space-y-4 font-sans text-xs uppercase tracking-widest text-foreground/70">
          <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <Link href="/#request" className="hover:text-foreground transition-colors">Concierge</Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
        </div>
        
        <div className="flex gap-8 font-sans text-xs uppercase tracking-widest text-foreground/50">
          <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
          <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
          <a href="#" className="hover:text-foreground transition-colors">Pinterest</a>
        </div>
      </div>

      <div className="relative w-full flex justify-center items-end mt-auto h-[20vh] md:h-[40vh]">
        <h2 className="footer-logo font-serif text-[clamp(4rem,20vw,25rem)] leading-none uppercase tracking-tighter opacity-10 select-none absolute bottom-0 translate-y-1/4">
          SKYE
        </h2>
      </div>
      
      <div className="w-full flex justify-between text-[10px] uppercase tracking-widest text-foreground/30 z-10 mt-12 font-sans">
        <span>© {new Date().getFullYear()} SKYE FASHION. All rights reserved.</span>
        <div className="flex gap-4">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
