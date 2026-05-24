"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
export function EditorialHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgBlackRef = useRef<HTMLDivElement>(null);
  const typographyRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline (0 -> ~6 seconds)
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Phase 1 - Black Canvas Hold (0-1s)
      // Covered by initial CSS state and waiting 1s before starting Phase 2
      
      // Phase 2 - Typographic Emergence (1-2.5s)
      tl.fromTo(
        typographyRef.current,
        { opacity: 0, y: 20, letterSpacing: "0.4em" },
        { opacity: 1, y: 0, letterSpacing: "0.15em", duration: 2.5, ease: "power4.out" },
        1
      );

      // Phase 3 - Background Reveal (2.5-4s)
      tl.fromTo(
        imageRef.current,
        { scale: 1.05, opacity: 0 },
        { scale: 1.0, opacity: 1, duration: 3, ease: "power3.out" },
        2.5
      );
      
      tl.to(bgBlackRef.current, { opacity: 0.15, duration: 3 }, 2.5);

      // Phase 5 - Micro Interaction Activation (5-6s)
      tl.fromTo(
        scrollCueRef.current,
        { opacity: 0, height: 0 },
        { opacity: 1, height: "80px", duration: 1.5, ease: "power3.out" },
        4
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 bg-black">
        <img
          ref={imageRef as any}
          src="/hero.jpg"
          alt="SKYE Hero"
          className="h-full w-full object-cover object-center opacity-0"
        />
      </div>

      {/* Black Fade Overlay (Phase 1/3) */}
      <div ref={bgBlackRef} className="absolute inset-0 z-10 bg-black" />



      {/* Typography Identity (Phase 2) */}
      <div className="relative z-30 flex h-full flex-col items-center justify-center mix-blend-difference pointer-events-none">
        <h1 
          ref={typographyRef} 
          className="font-serif text-[clamp(2.5rem,6vw,7rem)] font-light uppercase text-center opacity-0 tracking-[0.3em] text-white"
        >
          SKYE FASHION
        </h1>
      </div>

      {/* Scroll Cue (Phase 5) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pb-8 mix-blend-difference">
        <div ref={scrollCueRef} className="w-[1px] bg-white opacity-0" />
      </div>
    </section>
  );
}
