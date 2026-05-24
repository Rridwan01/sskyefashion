"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@prisma/client";

export function FeaturedProductsMuseumClient({ products }: { products: Product[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".museum-item");
      
      items.forEach((item) => {
        gsap.fromTo(item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 2.5,
            ease: "power4.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-16 md:py-24 px-6 md:px-12 max-w-[1900px] mx-auto bg-background text-foreground relative z-10">
      
      <div className="mb-12 md:mb-16 flex flex-col md:flex-row justify-between items-end border-b border-foreground/10 pb-6">
        <h2 className="font-serif text-4xl md:text-6xl uppercase tracking-widest font-light">Product</h2>
        <Link href="/shop" className="font-sans text-xs uppercase tracking-[0.2em] hover:text-muted-foreground transition-colors mt-8 md:mt-0 pb-2 border-b border-transparent hover:border-foreground">
          View All Products
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
        {products.slice(0, 4).map((product) => (
          <Link key={product.id} href={`/shop/${product.id}`} className="museum-item group cursor-pointer block">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted mb-4">
              <Image
                src={product.images[0] || "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
            </div>
            
            <div className="flex justify-between items-start font-sans mt-2">
               <div className="flex flex-col gap-0.5 items-start max-w-[70%]">
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground transition-colors group-hover:text-foreground">
                  {product.brand}
                </span>
                <h3 className="text-sm font-medium tracking-wide uppercase leading-relaxed group-hover:text-muted-foreground transition-colors">
                  {product.name}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground tracking-wider">₦{product.price.toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}
