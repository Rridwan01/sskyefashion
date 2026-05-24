import { prisma } from "@/lib/prisma";
import { ShopArchiveClient } from "@/components/shop/ShopArchiveClient";
import { Product, Category } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  let products: Product[] = [];
  let categories: Category[] = [];

  try {
    [products, categories] = await Promise.all([
      prisma.product.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.category.findMany()
    ]);
  } catch (error) {
    // Fallback data for local UI testing when DB is disconnected
    categories = [
      { id: "1", name: "Wears", slug: "wears", image: null },
      { id: "2", name: "Accessories", slug: "accessories", image: null },
      { id: "3", name: "Shoes", slug: "shoes", image: null },
    ];

    products = [
      { 
        id: "1", 
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
      },
      { 
        id: "2", 
        name: "Structured Nylon Crossbody", 
        slug: "structured-nylon-crossbody", 
        brand: "NORTHLINE",
        collection: "Street Uniform",
        aesthetic: "Utilitarian",
        description: "Minimalist crossbody bag with brutalist hardware.", 
        editorialDescription: "Utilitarian aesthetics meet high-fashion craftsmanship.",
        fitNotes: "Adjustable strap.",
        stylingNotes: "Wear tight across the chest.",
        price: 675000, 
        currency: "NGN",
        categoryId: "3", 
        images: ["https://images.unsplash.com/photo-1542272201-b1ca555f8505?q=80&w=1974&auto=format&fit=crop"], 
        inventory: 20,
        sizes: ["OS"],
        colors: ["Black", "Silver"],
        materials: ["Nylon", "Steel"],
        tags: ["bag", "hardware"],
        createdAt: new Date(), 
        updatedAt: new Date(),
        isNew: false,
        isFeatured: true
      },
    ] as any[];
  }

  return (
    <main>
      <ShopArchiveClient products={products} categories={categories} />
    </main>
  );
}
