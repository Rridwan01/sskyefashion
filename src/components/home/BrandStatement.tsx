"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function BrandStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation would ideally use SplitText or similar, 
      // but we can animate lines directly for this demo.
      const lines = textRef.current?.querySelectorAll("span") || [];
      
      gsap.fromTo(lines,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-48 px-4 sm:px-8 flex flex-col items-center justify-center bg-black text-white text-center">
      <h2 ref={textRef} className="font-serif text-[clamp(2rem,5vw,5rem)] font-light leading-tight tracking-wide max-w-5xl">
        <span className="block">MORE THAN A GARMENT.</span>
        <span className="block mt-4 italic text-white/70">AN IDENTITY.</span>
        <span className="block mt-8 text-lg font-sans uppercase tracking-[0.4em] font-normal text-white/50">Curated exclusively for the modern avant-garde.</span>
      </h2>
    </section>
  );
}
