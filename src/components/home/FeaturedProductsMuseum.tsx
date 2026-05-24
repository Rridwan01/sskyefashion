import { prisma } from "@/lib/prisma";
import { FeaturedProductsMuseumClient } from "./FeaturedProductsMuseumClient";
import { Product } from "@prisma/client";

export async function FeaturedProductsMuseum() {
  let products: Product[] = [];
  try {
    products = await prisma.product.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    // Fallback data for local UI testing when DB is disconnected
    products = [
      { id: "1", name: "Silk Trench", slug: "silk-trench", description: "Elegant silk trench coat.", price: 2400, categoryId: "1", images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop"], createdAt: new Date(), updatedAt: new Date() },
      { id: "2", name: "Leather Tote", slug: "leather-tote", description: "Minimalist leather tote.", price: 1800, categoryId: "2", images: ["https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1915&auto=format&fit=crop"], createdAt: new Date(), updatedAt: new Date() },
      { id: "3", name: "Cashmere Knit", slug: "cashmere-knit", description: "Soft cashmere knit sweater.", price: 950, categoryId: "1", images: ["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop"], createdAt: new Date(), updatedAt: new Date() },
      { id: "4", name: "Sculptural Heel", slug: "sculptural-heel", description: "Avant garde sculptural heel.", price: 1200, categoryId: "3", images: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1780&auto=format&fit=crop"], createdAt: new Date(), updatedAt: new Date() },
    ] as any[];
  }

  if (products.length === 0) return null;

  return <FeaturedProductsMuseumClient products={products} />;
}
