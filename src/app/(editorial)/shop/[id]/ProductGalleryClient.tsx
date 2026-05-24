"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { Plus } from "lucide-react";

export function ProductGalleryClient({ product }: { product: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { addItem, openCart } = useCartStore();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Accordion Component
  const Accordion = ({ title, children }: { title: string, children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="border-b border-muted">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="w-full py-6 flex justify-between items-center font-sans text-xs uppercase tracking-widest hover:text-muted-foreground transition-colors"
        >
          {title}
          <span className="text-xl font-light">{isOpen ? "−" : "+"}</span>
        </button>
        {isOpen && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
            {children}
          </div>
        )}
      </div>
    );
  };

  const productSizes = product?.sizes || ["OS"];
  const productMaterials = product?.materials || ["Information unavailable"];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(".product-image",
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }
      );
      
      gsap.fromTo(".product-title",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power2.out", delay: 0.5 }
      );

      const narrativeImages = gsap.utils.toArray<HTMLElement>(".narrative-image");
      narrativeImages.forEach((img) => {
        gsap.fromTo(img,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: img,
              start: "top 80%",
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleAcquire = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }
    addItem({
      id: `${product.id}-${selectedSize}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      quantity: 1,
    });
    openCart();
  };

  return (
    <main ref={containerRef} className="bg-background min-h-screen text-foreground pt-32 pb-48 selection:bg-foreground selection:text-background">
      
      <div className="px-4 md:px-12 flex flex-col md:flex-row gap-12 lg:gap-24 min-h-[80vh]">
        <div className="w-full md:w-[65%] h-[70vh] md:h-[85vh] relative overflow-hidden bg-muted">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="product-image object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 65vw"
          />
        </div>
        
        <div className="w-full md:w-[35%] flex flex-col justify-end pb-12">
          <span className="product-title font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
            {product.brand}
          </span>
          <h1 className="product-title font-serif text-4xl lg:text-6xl uppercase tracking-widest font-light leading-tight">
            {product.name}
          </h1>
          <div className="product-title mt-8 flex justify-between items-center font-sans text-sm tracking-widest">
            <span className="uppercase text-muted-foreground">NGN</span>
            <span>₦{product.price.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-12 mt-32 md:mt-48 flex flex-col md:flex-row gap-24">
        <div className="w-full md:w-1/2 flex flex-col gap-32">
          <div className="narrative-image relative aspect-[4/5] w-full bg-muted overflow-hidden">
             <Image src={product.images[1]} alt="Detail 1" fill className="object-cover" />
          </div>
          <div className="narrative-image relative aspect-square w-[80%] ml-auto bg-muted overflow-hidden">
             <Image src={product.images[2]} alt="Detail 2" fill className="object-cover" />
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col sticky top-48 h-fit">
          <p className="font-serif text-2xl lg:text-3xl leading-relaxed font-light text-foreground/80">
            {product.editorialDescription || product.description}
          </p>
          
          <div className="mt-16 border-t border-muted pt-8">
            <Accordion title="Materials & Construction">
              <div className="font-sans text-xs uppercase tracking-widest leading-loose text-muted-foreground pt-4 pb-8">
                {productMaterials.map((detail: string, i: number) => (
                  <p key={i}>{detail}</p>
                ))}
              </div>
            </Accordion>
            {(product.fitNotes || product.stylingNotes) && (
              <Accordion title="Fit & Styling">
                <div className="font-sans text-xs uppercase tracking-widest leading-loose text-muted-foreground pt-4 pb-8 flex flex-col gap-4">
                  {product.fitNotes && <p><span className="text-foreground">Fit:</span> {product.fitNotes}</p>}
                  {product.stylingNotes && <p><span className="text-foreground">Styling:</span> {product.stylingNotes}</p>}
                </div>
              </Accordion>
            )}
            <Accordion title="Providence & Shipping">
              <div className="font-sans text-xs uppercase tracking-widest leading-loose text-muted-foreground pt-4 pb-8">
                <p>Complimentary global shipping on all acquisitions.</p>
                <p>Ships within 24 hours of order confirmation.</p>
                <p>Includes certificate of authenticity.</p>
              </div>
            </Accordion>
            <Accordion title="Returns">
              <div className="font-sans text-xs uppercase tracking-widest leading-loose text-muted-foreground pt-4 pb-8">
                <p>14-day return window.</p>
                <p>Must be in unworn, flawless condition.</p>
              </div>
            </Accordion>
          </div>

          <div className="mt-24 border-t border-muted pt-12">
            <div className="flex justify-between items-center mb-6">
              <span className="font-sans text-xs uppercase tracking-[0.2em]">Select Size</span>
              <button className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors">
                Size Guide
              </button>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-12">
              {productSizes.map((size: string) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-12 h-12 px-4 flex items-center justify-center font-sans text-xs border transition-colors ${
                    selectedSize === size 
                      ? 'border-foreground bg-foreground text-background' 
                      : 'border-muted hover:border-foreground text-foreground'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <button
              onClick={handleAcquire}
              className="w-full py-6 bg-foreground text-background font-sans text-sm uppercase tracking-[0.3em] flex justify-between items-center px-8 hover:bg-foreground/90 transition-colors group"
            >
              <span>Add to Bag</span>
              <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
            </button>
          </div>
        </div>
      </div>
      
    </main>
  );
}
