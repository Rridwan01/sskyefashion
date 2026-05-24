"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    title: "Men's Wear",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974&auto=format&fit=crop",
    link: "/category/mens-wear",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Designer Perfumes",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1974&auto=format&fit=crop",
    link: "/category/perfumes",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Footwear",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop",
    link: "/category/footwear",
    className: "md:col-span-1 md:row-span-1",
  },
];

export function FeaturedCategories() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <h2 className="font-serif text-4xl text-foreground">CURATED FOR YOU</h2>
          <p className="mt-4 text-muted-foreground font-light max-w-xl">
            Explore our meticulously selected categories. Each piece is chosen for its exceptional quality and timeless appeal.
          </p>
        </div>
        <Link href="/categories" className="mt-6 md:mt-0 uppercase tracking-widest text-sm font-semibold border-b border-foreground pb-1 hover:text-muted-foreground transition-colors">
          View All Categories
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[300px]">
        {categories.map((category, index) => (
          <Link
            key={category.title}
            href={category.link}
            className={`group relative overflow-hidden bg-muted ${category.className}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="w-full h-full"
            >
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="font-serif text-3xl md:text-4xl text-white tracking-wider drop-shadow-md">
                  {category.title}
                </h3>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
