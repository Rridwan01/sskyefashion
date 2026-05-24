"use client";

import { useCartStore } from "@/store/cartStore";
import { X, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CartSlideOut() {
  const { items, isOpen, closeCart, updateQuantity, removeItem } = useCartStore();
  const overlayRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: "power2.out", display: "block" });
      gsap.to(cartRef.current, { x: 0, duration: 0.6, ease: "power3.out" });
    } else {
      gsap.to(cartRef.current, { x: "100%", duration: 0.5, ease: "power3.in" });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.4, ease: "power2.in", display: "none", delay: 0.1 });
    }
  }, [isOpen]);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      <div 
        ref={overlayRef}
        onClick={closeCart}
        className="fixed inset-0 bg-black/60 z-50 hidden backdrop-blur-sm"
      />

      {/* Cart Sidebar */}
      <div 
        ref={cartRef}
        className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-background border-l border-muted z-50 translate-x-full flex flex-col shadow-2xl"
      >
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-muted">
          <h2 className="font-serif text-2xl font-light uppercase tracking-widest">Your Bag</h2>
          <button onClick={closeCart} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground font-sans text-sm tracking-widest uppercase">
              Your bag is empty.
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-6">
                <div className="relative w-24 aspect-[3/4] bg-muted shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex flex-col flex-1 justify-between py-1">
                  <div>
                    <h3 className="font-sans text-sm uppercase tracking-wide font-medium">{item.name}</h3>
                    <p className="font-sans text-xs text-muted-foreground mt-1 uppercase">Size: {item.size}</p>
                    <p className="font-sans text-sm mt-2">₦{item.price.toLocaleString()}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-muted">
                      <button 
                        onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeItem(item.id)}
                        className="p-2 hover:bg-muted transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-sans text-xs w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-muted transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground underline underline-offset-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 md:p-8 bg-background border-t border-muted">
          <div className="flex justify-between font-sans text-sm uppercase tracking-widest mb-6">
            <span>Subtotal</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </div>
          <button 
            onClick={async () => {
              try {
                const res = await fetch("/api/checkout", {
                  method: "POST",
                  body: JSON.stringify({ items }),
                });
                const data = await res.json();
                if (!res.ok) {
                  throw new Error(data.error || "Checkout failed");
                }
                if (data.url) {
                  window.location.href = data.url;
                }
              } catch (error: any) {
                console.error("Checkout failed:", error);
                alert(error.message || "Checkout failed. Please try again.");
              }
            }}
            className="w-full py-4 bg-foreground text-background font-sans text-xs uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors disabled:opacity-50"
            disabled={items.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}
