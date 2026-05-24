import { prisma } from "@/lib/prisma";
import { CuratedWorldsClient } from "./CuratedWorldsClient";
import { Category } from "@prisma/client";

export async function CuratedWorlds() {
  let categories: Category[] = [];
  try {
    const rawCategories = await prisma.category.findMany();
    const order = ["wears", "accessories", "shoes"];
    categories = rawCategories
      .filter((c) => order.includes(c.slug))
      .sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));
  } catch (error) {
    // Fallback data for local UI testing when DB is disconnected
    categories = [
      { id: "1", name: "Wears", slug: "wears", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop" },
      { id: "2", name: "Accessories", slug: "accessories", image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=1974&auto=format&fit=crop" },
      { id: "3", name: "Shoes", slug: "shoes", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop" },
    ];
  }

  if (categories.length === 0) return null;

  return <CuratedWorldsClient categories={categories} />;
}
