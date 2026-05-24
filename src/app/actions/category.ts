"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const image = formData.get("image") as string;
  
  // Generate a basic slug
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  try {
    await prisma.category.create({
      data: {
        name,
        slug,
        image: image || null,
      }
    });

    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    console.error("Failed to create category:", error);
    return { success: false, error: "Database error" };
  }
}
