"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { User, Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/store/cartStore";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isHome = pathname === "/";
  
  // Header is visible by default
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { openCart, items } = useCartStore();

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const [isPastHero, setIsPastHero] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Hide header when scrolling down past 100px, show when scrolling up
    if (latest > 100 && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    if (latest >= 800) {
      setIsPastHero(true);
    } else {
      setIsPastHero(false);
    }
  });

  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 },
        }}
        animate={hidden && !mobileMenuOpen ? "hidden" : "visible"}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} 
        className={`fixed top-0 inset-x-0 z-50 w-full flex items-center justify-between px-6 py-6 transition-colors duration-500 pointer-events-auto ${isHome && !isPastHero && !mobileMenuOpen ? "mix-blend-difference text-white" : "bg-background/80 backdrop-blur-md text-foreground border-b border-foreground/10"}`}
      >
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <Link href="/" className="font-sans text-sm font-medium tracking-[0.2em] uppercase">
            SKYE
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-12 font-sans text-xs uppercase tracking-widest">
          <Link href="/shop" className="hover:opacity-70 transition-opacity">Shop</Link>
          <Link href="/#request" className="hover:opacity-70 transition-opacity">Concierge</Link>
          <Link href="/contact" className="hover:opacity-70 transition-opacity">Contact</Link>
        </nav>

        <div className="flex items-center space-x-6">
          <ThemeToggle />
          <button onClick={openCart} className="relative p-2 hover:opacity-70 transition-opacity flex items-center gap-2">
            <span className="font-sans text-xs uppercase tracking-widest hidden sm:inline">Bag</span>
            {cartItemCount > 0 && (
              <span className="text-[10px] bg-foreground text-background px-1.5 py-0.5 rounded-full font-medium leading-none">
                {cartItemCount}
              </span>
            )}
          </button>
          {session ? (
            <Link href="/dashboard" className="p-2 hover:opacity-70 transition-opacity">
              <User className="h-5 w-5" />
            </Link>
          ) : (
            <Link href="/auth/signin" className="p-2 hover:opacity-70 transition-opacity">
              <User className="h-5 w-5" />
            </Link>
          )}
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-45 bg-background pt-24 px-6 flex flex-col pointer-events-auto"
          >
            <nav className="flex flex-col space-y-8 font-serif text-3xl font-light uppercase tracking-widest mt-12">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link href="/shop" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
              <Link href="/#request" onClick={() => setMobileMenuOpen(false)}>Concierge</Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            </nav>

            <div className="mt-auto mb-12 pt-8 border-t border-foreground/10 flex flex-col space-y-4 font-sans text-xs uppercase tracking-widest text-muted-foreground">
              <span className="text-[9px] text-muted-foreground/50">Connect with the digital atelier</span>
              <div className="flex gap-8">
                <a href="https://www.instagram.com/sskye_fashion?igsh=MWQzdmlka212MTZ1bQ==" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Instagram</a>
                <a href="https://wa.me/2348100887247" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">WhatsApp</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
