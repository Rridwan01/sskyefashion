"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden bg-black">
      {/* Background Video/Image Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Fashion Campaign"
          className="h-full w-full object-cover object-center opacity-80"
        />
      </div>

      <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-6 max-w-4xl"
        >
          <h1 className="font-serif text-5xl font-medium tracking-wide text-white sm:text-7xl md:text-8xl">
            REDEFINE YOUR <br /> AESTHETIC
          </h1>
          <p className="mx-auto max-w-lg font-sans text-lg text-white/90 sm:text-xl font-light tracking-wide">
            Discover the latest in premium men's wear, designer fragrances, and exclusive lifestyle accessories.
          </p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="pt-8"
          >
            <Link href="/shop">
              <Button size="lg" className="bg-white text-black hover:bg-white/90 px-12 py-6 text-sm uppercase tracking-[0.2em] font-semibold rounded-none">
                Shop the Collection
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
