"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@prisma/client";

export function LookbookStripClient({ products }: { products: Product[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Varied aspect ratio layout styles for each look (Index 0, 1, 2)
  const cardVariants = [
    {
      aspectClass: "aspect-[3/4] w-[280px] md:w-[380px]", // Portrait
      desc: "LOOK 01 // OVERSIZED STRUCTURAL WOOL SHAPE"
    },
    {
      aspectClass: "aspect-[4/3] w-[320px] md:w-[480px]", // Landscape
      desc: "LOOK 02 // TECHNICAL DECONSTRUCTED TEXTURE"
    },
    {
      aspectClass: "aspect-[2/5] w-[180px] md:w-[260px]", // Tall slice
      desc: "LOOK 03 // MATTE FINISH CALFSKIN GEOMETRY"
    }
  ];

  return (
    <section className="py-24 bg-background border-t border-b border-foreground/5 relative flex flex-col items-center justify-center overflow-hidden">
      
      {/* Editorial Title Header */}
      <div className="w-full max-w-[1600px] px-6 md:px-12 mb-10 flex justify-between items-end z-10">
        <div>
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground">02 / Seasonal Lookbook</span>
          <h3 className="font-serif text-3xl uppercase tracking-wider font-light mt-2">Corridor Archive</h3>
        </div>
        <span className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase hidden md:block">Scroll or Swipe Horizontally</span>
      </div>

      {/* Large watermark text placed behind scroller grid */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-0 pointer-events-none select-none overflow-hidden h-fit flex justify-center items-center">
        <h2 className="font-serif text-[clamp(4rem,14vw,20rem)] leading-none text-foreground/[0.03] dark:text-background/[0.03] tracking-[0.25em] uppercase select-none w-full text-center">
          SKYE ARCHIVE
        </h2>
      </div>

      {/* Snap Horizontal Scroll Corridor Container */}
      <div 
        ref={scrollContainerRef}
        className="w-full flex items-center gap-12 md:gap-24 overflow-x-auto scroll-smooth snap-x snap-mandatory py-12 px-[10vw] md:px-[30vw] z-10 scrollbar-none"
        style={{ scrollbarWidth: 'none' }}
      >
        {products.map((product, i) => {
          const variant = cardVariants[i % cardVariants.length];
          return (
            <div 
              key={product.id} 
              className={`snap-center shrink-0 group relative overflow-hidden bg-muted border border-foreground/5 transition-all duration-700 ease-out hover:border-foreground/20 hover:shadow-lg hover:shadow-black/5 ${variant.aspectClass}`}
            >
              <Link href={`/shop/${product.id}`} className="block w-full h-full relative">
                <Image
                  src={product.images[0] || "https://images.unsplash.com/photo-1507680434267-dbd3f5e1f743?q=80&w=1974&auto=format&fit=crop"}
                  alt={product.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-[1200ms] ease-out will-change-transform"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                
                {/* 1-Line Minimal Construction Note Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end text-left pointer-events-none select-none z-20">
                  <span className="font-mono text-[9px] tracking-[0.2em] text-white/50">{product.brand}</span>
                  <h4 className="font-serif text-lg text-white tracking-widest uppercase mt-1 truncate">{product.name}</h4>
                  <p className="font-sans text-[9px] tracking-widest text-white/70 uppercase mt-2 font-mono border-t border-white/10 pt-2 truncate">
                    {variant.desc}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Action Exit Path CTA */}
      <div className="mt-8 z-10 flex flex-col items-center gap-2">
        <Link 
          href="/shop" 
          className="font-sans text-[10px] uppercase tracking-[0.2em] border-b border-foreground/30 hover:border-foreground hover:text-muted-foreground transition-all pb-1"
        >
          Browse Full Runway Archive
        </Link>
      </div>

    </section>
  );
}
