
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProductGalleryClient } from "./ProductGalleryClient";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  let product = null;
  try {
    product = await prisma.product.findUnique({
      where: { id },
    });
  } catch (error) {
    // Silent catch, fallback below
  }
  
  if (!product) {
    product = {
      id,
      name: "Heavyweight Oversized Knit",
      slug: "heavyweight-oversized-knit",
      brand: "VANTA Studio",
      collection: "Monochrome Essentials",
      aesthetic: "Quiet Luxury",
      description: "A meticulously crafted knit offering structural volume.",
      editorialDescription: "The absolute peak of quiet luxury, crafted for the urban environment.",
      fitNotes: "Oversized fit. Dropped shoulders.",
      stylingNotes: "Pairs perfectly with wide-leg tailoring.",
      price: 1275000,
      currency: "NGN",
      categoryId: "1",
      images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop"],
      inventory: 10,
      sizes: ["S", "M", "L"],
      colors: ["Black"],
      materials: ["100% Cashmere"],
      tags: ["knit", "heavyweight"],
      createdAt: new Date(),
      updatedAt: new Date(),
      isNew: true,
      isFeatured: true
    } as any;
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | SKYE FASHION`,
      description: product.description,
      images: [
        {
          url: product.images[0] || "",
          width: 800,
          height: 1000,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let product = null;
  try {
    product = await prisma.product.findUnique({
      where: { id },
      include: { category: true }
    });
  } catch (error) {
    // Mock fallback product
    product = {
      id,
      name: "Heavyweight Oversized Knit",
      slug: "heavyweight-oversized-knit",
      brand: "VANTA Studio",
      collection: "Monochrome Essentials",
      aesthetic: "Quiet Luxury",
      description: "A meticulously crafted knit offering structural volume.",
      editorialDescription: "The absolute peak of quiet luxury, crafted for the urban environment.",
      fitNotes: "Oversized fit. Dropped shoulders.",
      stylingNotes: "Pairs perfectly with wide-leg tailoring.",
      price: 1275000,
      currency: "NGN",
      categoryId: "1",
      images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop"],
      inventory: 10,
      sizes: ["S", "M", "L"],
      colors: ["Black"],
      materials: ["100% Cashmere"],
      tags: ["knit", "heavyweight"],
      createdAt: new Date(),
      updatedAt: new Date(),
      isNew: true,
      isFeatured: true,
      category: { id: "1", name: "Archive", slug: "archive", image: null, createdAt: new Date() }
    } as any;
  }

  if (!product) {
    notFound();
  }

  // Fallback images if not enough provided
  const images = product.images.length >= 3 ? product.images : [
    product.images[0] || "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542272201-b1ca555f8505?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550614000-4b95dd2449a6?q=80&w=2070&auto=format&fit=crop"
  ];

  return <ProductGalleryClient product={{ ...product, images }} />;
}


