import { prisma } from "@/lib/prisma";
import { LookbookStripClient } from "./LookbookStripClient";
import { Product } from "@prisma/client";

export async function LookbookStrip() {
  let products: Product[] = [];
  try {
    products = await prisma.product.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    // Fallback data for local UI testing when DB is disconnected
    products = [
      { id: "1", name: "Look 1", slug: "look-1", description: "", price: 0, categoryId: "1", images: ["https://images.unsplash.com/photo-1507680434267-dbd3f5e1f743?q=80&w=1974&auto=format&fit=crop"], createdAt: new Date(), updatedAt: new Date() },
      { id: "2", name: "Look 2", slug: "look-2", description: "", price: 0, categoryId: "1", images: ["https://images.unsplash.com/photo-1620800615555-523eeb2bb2e1?q=80&w=1974&auto=format&fit=crop"], createdAt: new Date(), updatedAt: new Date() },
      { id: "3", name: "Look 3", slug: "look-3", description: "", price: 0, categoryId: "1", images: ["https://images.unsplash.com/photo-1616053361099-278ceb4eefbb?q=80&w=1974&auto=format&fit=crop"], createdAt: new Date(), updatedAt: new Date() },
    ] as any[];
  }

  if (products.length === 0) {
    products = [
      { id: "1", name: "Heavyweight Oversized Knit", slug: "heavyweight-oversized-knit", description: "A meticulously crafted knit offering structural volume and severe warmth.", price: 1275000, categoryId: "1", images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop"], brand: "SKYE Atelier", createdAt: new Date(), updatedAt: new Date() },
      { id: "2", name: "Deconstructed Silk Trench", slug: "deconstructed-silk-trench", description: "A flowing, fluid take on the classic trench coat, heavily deconstructed.", price: 3600000, categoryId: "1", images: ["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop"], brand: "SKYE Atelier", createdAt: new Date(), updatedAt: new Date() },
      { id: "3", name: "Sculptural Asymmetric Blazer", slug: "sculptural-asymmetric-blazer", description: "Tailoring disrupted. An asymmetric cut provides a striking silhouette.", price: 2775000, categoryId: "1", images: ["https://images.unsplash.com/photo-1507680434267-dbd3f5e1f743?q=80&w=1974&auto=format&fit=crop"], brand: "SKYE Atelier", createdAt: new Date(), updatedAt: new Date() },
    ] as any[];
  }

  return <LookbookStripClient products={products} />;
}
