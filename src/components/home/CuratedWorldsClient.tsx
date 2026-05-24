"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Category } from "@prisma/client";

export function CuratedWorldsClient({ categories }: { categories: Category[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollRatio, setScrollRatio] = useState(0);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate ratio when section is visible
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const totalHeight = rect.height + viewportHeight;
        const scrolled = viewportHeight - rect.top;
        const ratio = Math.max(0, Math.min(1, scrolled / totalHeight));
        setScrollRatio(ratio);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Map metadata for each curated world
  const metadataMap: Record<string, { code: string; desc: string; material: string }> = {
    wears: {
      code: "SKYE-W-01",
      desc: "Architectural Cashmere & Tailored Outerwear",
      material: "100% Wool / Cashmere Blend"
    },
    accessories: {
      code: "SKYE-A-02",
      desc: "Bespoke Carryalls & High-Hardware Accents",
      material: "Full Grain Calfskin"
    },
    shoes: {
      code: "SKYE-S-03",
      desc: "Handcrafted Footwear & Atelier Shoes",
      material: "Italian Calf Leather"
    }
  };

  return (
    <section ref={containerRef} className="pt-20 pb-20 px-6 md:px-12 bg-background text-foreground max-w-[2200px] mx-auto z-10 relative">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12 lg:gap-x-24 items-start w-full">
        
        {/* Left Column - Sticky Sidebar */}
        <div className="col-span-1 md:col-span-5 md:sticky md:top-32 space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground">01 / Curated Collections</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-wide leading-tight">
              Curated <br/> Worlds
            </h2>
            <p className="font-sans text-xs md:text-sm text-muted-foreground tracking-wide leading-relaxed max-w-sm">
              A selection of minimal, premium apparel and accessories crafted for utility and presence. Selected runway pieces and custom collections.
            </p>
          </div>

          {/* Commerce Action Group */}
          <div className="space-y-4 pt-4 border-t border-foreground/10 max-w-xs">
            <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Direct Archives</span>
            <div className="flex flex-col gap-3 font-sans text-xs uppercase tracking-widest">
              <Link href="/shop?category=wears" className="group flex justify-between items-center py-2 border-b border-foreground/5 hover:border-foreground/20 transition-colors">
                <span>01. Wears</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
              </Link>
              <Link href="/shop?category=accessories" className="group flex justify-between items-center py-2 border-b border-foreground/5 hover:border-foreground/20 transition-colors">
                <span>02. Accessories</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
              </Link>
              <Link href="/shop?category=shoes" className="group flex justify-between items-center py-2 border-b border-foreground/5 hover:border-foreground/20 transition-colors">
                <span>03. Shoes</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
              </Link>
            </div>
          </div>

          {/* Intersection Driven Progress Bar */}
          <div className="pt-6 max-w-xs hidden md:block">
            <div className="flex justify-between text-[9px] tracking-[0.2em] uppercase text-muted-foreground font-mono mb-2">
              <span>Overview Progress</span>
              <span>{(scrollRatio * 100).toFixed(0)}%</span>
            </div>
            <div className="w-full h-[1px] bg-foreground/10 relative">
              <div 
                className="absolute top-0 left-0 h-full bg-foreground transition-all duration-75 ease-out" 
                style={{ width: `${scrollRatio * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right Column - Controlled Stagger Grid */}
        <div className="col-span-1 md:col-span-7 space-y-12 md:space-y-24 w-full">
          {categories.map((cat, i) => {
            const meta = metadataMap[cat.slug] || { code: "SKYE-X-99", desc: cat.name, material: "Curated Item" };
            
            // Define layout styles based on card order (only apply transforms on desktop md: and above)
            let cardStyle = "aspect-[16/10] w-full"; // Card 1: Wears
            if (i === 1) {
              cardStyle = "aspect-[3/4] w-full md:w-[85%] md:-translate-y-10 md:ml-[15%] z-10"; // Card 2: Accessories
            } else if (i === 2) {
              cardStyle = "aspect-square w-full md:w-[90%] md:translate-x-8 md:translate-y-10"; // Card 3: Shoes
            }

            return (
              <div 
                key={cat.id} 
                className={`world-block relative overflow-hidden group border border-foreground/5 bg-muted ${cardStyle} transition-transform duration-[1200ms] ease-out`}
              >
                <Link 
                  href={`/shop?category=${cat.slug}`}
                  className="relative block w-full h-full"
                >
                  <Image
                    src={cat.image || "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1974&auto=format&fit=crop"}
                    alt={cat.name}
                    fill
                    className="object-cover opacity-75 grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-[1.02] group-hover:opacity-90 group-hover:brightness-105 group-hover:contrast-105 transition-all duration-[1200ms] ease-out will-change-transform"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={i === 0}
                  />
                  
                  {/* Subtle metadata overlay on hover */}
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-[600ms] ease-out flex flex-col justify-end text-left select-none pointer-events-none z-20">
                    <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/40">{meta.code}</span>
                    <h3 className="font-serif text-2xl text-white tracking-widest uppercase mt-2">
                      {cat.name}
                    </h3>
                    <p className="font-sans text-[10px] tracking-[0.2em] text-white/70 uppercase mt-2 font-light">
                      {meta.desc}
                    </p>
                    <span className="font-sans text-[9px] tracking-[0.3em] text-white/50 uppercase mt-1 border-t border-white/10 pt-2 font-mono">
                      {meta.material}
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
