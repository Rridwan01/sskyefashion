"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { Category } from "@prisma/client";

export function CuratedWorldsClient({ categories }: { categories: Category[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray<HTMLElement>(".world-block");
      
      // Phase 3 smooth animation
      blocks.forEach((block) => {
        gsap.fromTo(block,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: block,
              start: "top 80%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="pt-24 pb-16 px-6 md:px-12 bg-background text-foreground max-w-[2200px] mx-auto z-10 relative">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-y-20 md:gap-x-8 lg:gap-x-16 items-start w-full">
        {categories.length > 0 && (
          <div 
            key={categories[0].id} 
            className="world-block col-span-1 md:col-span-12 aspect-[16/9] md:aspect-[21/9] w-full"
          >
            <Link 
              href={`/shop?category=${categories[0].slug}`}
              className="group relative block w-full h-full overflow-hidden bg-black"
            >
              <Image
                src={categories[0].image || "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1974&auto=format&fit=crop"}
                alt={categories[0].name}
                fill
                className="object-cover opacity-70 transition-transform duration-[2000ms] group-hover:scale-105 group-hover:opacity-90"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-all duration-700 bg-black/10 group-hover:bg-black/40">
                <h3 className="font-serif text-3xl md:text-5xl text-white tracking-[0.2em] uppercase text-center px-4 transition-transform duration-700 group-hover:-translate-y-2">
                  {categories[0].name}
                </h3>
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white mt-4 opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4">
                  Explore
                </span>
              </div>
            </Link>
          </div>
        )}

        {categories.length > 1 && (
          <div 
            key={categories[1].id} 
            className="world-block col-span-1 md:col-span-6 lg:col-span-5 aspect-[3/4] w-full"
          >
            <Link 
              href={`/shop?category=${categories[1].slug}`}
              className="group relative block w-full h-full overflow-hidden bg-black"
            >
              <Image
                src={categories[1].image || "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1974&auto=format&fit=crop"}
                alt={categories[1].name}
                fill
                className="object-cover opacity-70 transition-transform duration-[2000ms] group-hover:scale-105 group-hover:opacity-90"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-all duration-700 bg-black/10 group-hover:bg-black/40">
                <h3 className="font-serif text-3xl md:text-4xl text-white tracking-[0.2em] uppercase text-center px-4 transition-transform duration-700 group-hover:-translate-y-2">
                  {categories[1].name}
                </h3>
              </div>
            </Link>
          </div>
        )}

        {categories.length > 2 && (
          <div 
            key={categories[2].id} 
            className="world-block col-span-1 md:col-span-6 lg:col-span-5 md:col-start-7 lg:col-start-8 aspect-[4/5] w-full md:mt-12"
          >
            <Link 
              href={`/shop?category=${categories[2].slug}`}
              className="group relative block w-full h-full overflow-hidden bg-black"
            >
              <Image
                src={categories[2].image || "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1974&auto=format&fit=crop"}
                alt={categories[2].name}
                fill
                className="object-cover opacity-70 transition-transform duration-[2000ms] group-hover:scale-105 group-hover:opacity-90"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-all duration-700 bg-black/10 group-hover:bg-black/40">
                <h3 className="font-serif text-3xl md:text-4xl text-white tracking-[0.2em] uppercase text-center px-4 transition-transform duration-700 group-hover:-translate-y-2">
                  {categories[2].name}
                </h3>
              </div>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
