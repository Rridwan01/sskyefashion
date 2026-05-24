"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const brand = formData.get("brand") as string || "SKYE Atelier";
  const collection = formData.get("collection") as string || null;
  const aesthetic = formData.get("aesthetic") as string || null;
  const description = formData.get("description") as string;
  const editorialDescription = formData.get("editorialDescription") as string || null;
  const fitNotes = formData.get("fitNotes") as string || null;
  const stylingNotes = formData.get("stylingNotes") as string || null;
  const price = parseFloat(formData.get("price") as string);
  const inventory = parseInt(formData.get("inventory") as string);
  const categoryId = formData.get("categoryId") as string;
  
  const imagesStr = formData.get("images") as string;
  let images = imagesStr ? imagesStr.split(",").map(i => i.trim()).filter(Boolean) : [];
  
  const newImageFiles = formData.getAll("newImages") as File[];
  if (newImageFiles && newImageFiles.length > 0) {
    for (const file of newImageFiles) {
      if (file && file.size > 0) {
        try {
          const url = await uploadToCloudinary(file, "products");
          images.push(url);
        } catch (uploadError) {
          console.error("Failed to upload product image to Cloudinary:", uploadError);
        }
      }
    }
  }

  const sizesStr = formData.get("sizes") as string;
  const sizes = sizesStr ? sizesStr.split(",").map(i => i.trim()).filter(Boolean) : [];

  const colorsStr = formData.get("colors") as string;
  const colors = colorsStr ? colorsStr.split(",").map(i => i.trim()).filter(Boolean) : [];

  const materialsStr = formData.get("materials") as string;
  const materials = materialsStr ? materialsStr.split(",").map(i => i.trim()).filter(Boolean) : [];

  // Generate a basic slug
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  try {
    await prisma.product.create({
      data: {
        name,
        slug,
        brand,
        collection,
        aesthetic,
        description,
        editorialDescription,
        fitNotes,
        stylingNotes,
        price,
        inventory,
        categoryId,
        images,
        sizes,
        colors,
        materials,
      }
    });

    revalidatePath("/admin/products");
    revalidatePath("/shop");
    return { success: true };
  } catch (error) {
    console.error("Failed to create product:", error);
    return { success: false, error: "Failed to create product in database" };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const brand = formData.get("brand") as string || "SKYE Atelier";
  const collection = formData.get("collection") as string || null;
  const aesthetic = formData.get("aesthetic") as string || null;
  const description = formData.get("description") as string;
  const editorialDescription = formData.get("editorialDescription") as string || null;
  const fitNotes = formData.get("fitNotes") as string || null;
  const stylingNotes = formData.get("stylingNotes") as string || null;
  const price = parseFloat(formData.get("price") as string);
  const inventory = parseInt(formData.get("inventory") as string);
  const categoryId = formData.get("categoryId") as string;
  
  const imagesStr = formData.get("images") as string;
  let images = imagesStr ? imagesStr.split(",").map(i => i.trim()).filter(Boolean) : [];

  const newImageFiles = formData.getAll("newImages") as File[];
  if (newImageFiles && newImageFiles.length > 0) {
    for (const file of newImageFiles) {
      if (file && file.size > 0) {
        try {
          const url = await uploadToCloudinary(file, "products");
          images.push(url);
        } catch (uploadError) {
          console.error("Failed to upload new product image to Cloudinary:", uploadError);
        }
      }
    }
  }

  const sizesStr = formData.get("sizes") as string;
  const sizes = sizesStr ? sizesStr.split(",").map(i => i.trim()).filter(Boolean) : [];

  const colorsStr = formData.get("colors") as string;
  const colors = colorsStr ? colorsStr.split(",").map(i => i.trim()).filter(Boolean) : [];

  const materialsStr = formData.get("materials") as string;
  const materials = materialsStr ? materialsStr.split(",").map(i => i.trim()).filter(Boolean) : [];

  try {
    await prisma.product.update({
      where: { id },
      data: {
        name,
        brand,
        collection,
        aesthetic,
        description,
        editorialDescription,
        fitNotes,
        stylingNotes,
        price,
        inventory,
        categoryId,
        images,
        sizes,
        colors,
        materials,
      }
    });

    revalidatePath("/admin/products");
    revalidatePath("/shop");
    revalidatePath(`/shop/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to update product:", error);
    return { success: false, error: "Failed to update product details" };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/admin/products");
    revalidatePath("/shop");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { success: false, error: "Failed to delete product from database" };
  }
}
