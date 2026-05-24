"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    images: string[];
    isNew?: boolean;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col space-y-3"
    >
      <Link href={`/product/${product.slug}`} className="relative aspect-[3/4] overflow-hidden bg-muted">
        {product.isNew && (
          <div className="absolute left-3 top-3 z-10 bg-background px-2 py-1 text-xs font-semibold uppercase tracking-wider text-foreground">
            New Arrival
          </div>
        )}
        <button className="absolute right-3 top-3 z-10 p-2 text-foreground/50 transition-colors hover:text-foreground">
          <Heart className="h-5 w-5" />
          <span className="sr-only">Add to wishlist</span>
        </button>
        
        {/* Primary Image */}
        <Image
          src={product.images[0] || "/placeholder.jpg"}
          alt={product.name}
          fill
          className="object-cover transition-opacity duration-500 group-hover:opacity-0"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Secondary Image for Hover */}
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            fill
            className="absolute inset-0 object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center bg-black/40 p-4 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Button variant="luxury" className="w-full">
            Quick Add
          </Button>
        </div>
      </Link>
      
      <div className="flex flex-col space-y-1 text-center">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-serif text-lg leading-tight tracking-wide text-foreground transition-colors hover:text-foreground/70">
            {product.name}
          </h3>
        </Link>
        <p className="font-sans text-sm font-medium text-muted-foreground">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </motion.div>
  );
}
