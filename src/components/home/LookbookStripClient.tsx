"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Product } from "@prisma/client";

export function LookbookStripClient({ products }: { products: Product[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const strips = gsap.utils.toArray<HTMLElement>(".look-strip");
      
      strips.forEach((strip, i) => {
        gsap.to(strip, {
          yPercent: i % 2 === 0 ? -20 : 20, // Alternating scroll directions
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1, // Smooth momentum
          }
        });
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-16 md:py-24 px-4 bg-background/50 border-t border-b border-foreground/5 overflow-hidden relative min-h-[70vh] md:min-h-[85vh] flex flex-col items-center justify-center -mt-8 md:-mt-16 z-20">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 text-center pointer-events-none mix-blend-difference select-none w-full">
         <h2 className="font-serif text-[clamp(5rem,15vw,20rem)] leading-none text-white/10 tracking-[0.2em] uppercase select-none">Lookbook</h2>
      </div>

      <div className="flex w-full max-w-[1600px] gap-4 md:gap-12 lg:gap-16 justify-center items-center opacity-95 z-10 relative">
        {products.map((product, i) => (
          <div 
            key={product.id} 
            className={`look-strip relative w-[28%] md:w-[24%] aspect-[3/4] z-10 ${i % 2 !== 0 ? 'mt-20' : '-mt-20'}`}
          >
            <Image
              src={product.images[0] || "https://images.unsplash.com/photo-1507680434267-dbd3f5e1f743?q=80&w=1974&auto=format&fit=crop"}
              alt={`Look ${i+1}`}
              fill
              className="object-cover grayscale"
              sizes="25vw"
            />
          </div>
        ))}
      </div>

    </section>
  );
}
