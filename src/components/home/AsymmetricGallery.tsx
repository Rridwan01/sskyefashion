"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const editorialPieces = [
  {
    title: "Collection 01",
    subtitle: "The Genesis",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
    link: "/collections/genesis",
    alignment: "left",
  },
  {
    title: "Nocturne",
    subtitle: "Night Fall",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974&auto=format&fit=crop",
    link: "/collections/nocturne",
    alignment: "right",
  },
];

export function AsymmetricGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const images = gsap.utils.toArray<HTMLElement>(".gallery-image");
      
      images.forEach((img) => {
        gsap.fromTo(img, 
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
              end: "top 50%",
              scrub: 1, // Soft scrubbing
            }
          }
        );
        
        // Internal image parallax
        const innerImg = img.querySelector("img");
        if(innerImg) {
          gsap.to(innerImg, {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        }
      });
      
      const texts = gsap.utils.toArray<HTMLElement>(".gallery-text");
      texts.forEach((text) => {
         gsap.fromTo(text,
           { x: text.classList.contains('text-right') ? 50 : -50, opacity: 0 },
           {
             x: 0,
             opacity: 1,
             duration: 1.5,
             ease: "power2.out",
             scrollTrigger: {
               trigger: text,
               start: "top 80%",
             }
           }
         );
      });
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-4 sm:px-8 max-w-[1400px] mx-auto bg-background">
      <div className="flex flex-col space-y-32 md:space-y-48">
        {editorialPieces.map((piece, index) => (
          <div 
            key={index} 
            className={`relative flex flex-col ${piece.alignment === 'right' ? 'md:items-end' : 'md:items-start'}`}
          >
            <Link href={piece.link} className="group relative block w-full md:w-[65%] lg:w-[55%] gallery-image overflow-hidden aspect-[4/5]">
               <Image
                 src={piece.image}
                 alt={piece.title}
                 fill
                 className="object-cover scale-110" // scale up for parallax room
                 sizes="(max-width: 768px) 100vw, 65vw"
               />
               {/* Hover Overlay */}
               <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
            </Link>
            
            <div className={`gallery-text mt-8 md:absolute md:top-1/2 md:-translate-y-1/2 ${piece.alignment === 'right' ? 'md:left-[10%] text-left' : 'md:right-[10%] md:text-right'}`}>
               <span className="font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground block mb-4">{piece.subtitle}</span>
               <h2 className="font-serif text-5xl md:text-7xl lg:text-[8rem] leading-none text-foreground mix-blend-difference">{piece.title}</h2>
               <Link href={piece.link} className="inline-block mt-8 font-sans text-sm uppercase tracking-widest border-b border-foreground pb-1 hover:text-muted-foreground transition-colors">
                 Explore
               </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
