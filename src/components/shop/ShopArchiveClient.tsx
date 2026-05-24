"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, Category } from "@prisma/client";
import gsap from "gsap";

export function ShopArchiveClient({ products, categories }: { products: Product[], categories: Category[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  // Filter products based on selected category
  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.categoryId === activeCategory);

  // Animate items on category change
  useEffect(() => {
    gsap.fromTo(".archive-item", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.05, ease: "power3.out" }
    );
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-background text-foreground pt-48 pb-64 px-6 md:px-12 max-w-[2000px] mx-auto">
      
      {/* Header & Filters */}
      <div className="mb-32 flex flex-col items-center text-center">
        <h1 className="font-serif text-5xl md:text-8xl font-light uppercase tracking-widest mb-16">
          The Archive
        </h1>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 font-sans text-xs tracking-[0.2em] uppercase">
          <button 
            onClick={() => setActiveCategory("all")}
            className={`transition-colors hover:text-foreground pb-2 border-b-2 ${activeCategory === "all" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground"}`}
          >
            All Works
          </button>
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`transition-colors hover:text-foreground pb-2 border-b-2 ${activeCategory === cat.id ? "border-foreground text-foreground" : "border-transparent text-muted-foreground"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-12 lg:gap-x-24 gap-y-12 md:gap-y-24 lg:gap-y-32">
        {filteredProducts.map((product, idx) => {
          return (
            <Link 
              key={product.id} 
              href={`/shop/${product.id}`}
              className="archive-item group block relative"
            >
              <div className="relative w-full aspect-[3/4] bg-muted overflow-hidden mb-6">
                <Image
                  src={product.images[0] || "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5" />
              </div>
              
              <div className="flex flex-col font-sans mt-4 space-y-1">
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">{product.brand}</span>
                <h3 className="text-xs md:text-sm font-medium tracking-wide uppercase leading-relaxed group-hover:text-muted-foreground transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground tracking-wider mt-1">₦{product.price.toLocaleString()}</p>
              </div>
            </Link>
          );
        })}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 text-muted-foreground">
          <p className="font-sans text-xs tracking-widest uppercase">No works found in this collection.</p>
        </div>
      )}

    </div>
  );
}
