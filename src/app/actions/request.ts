"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/server/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function createItemRequest(formData: FormData) {
  const session = await auth();
  
  if (!session?.user) {
    return { success: false, error: "Must be logged in to submit a request" };
  }

  const description = formData.get("description") as string;
  const imageFile = formData.get("image") as File | null;
  
  if (!description || description.trim() === "") {
    return { success: false, error: "Description is required" };
  }

  let imageUrl: string | null = null;
  if (imageFile && imageFile.size > 0) {
    try {
      imageUrl = await uploadToCloudinary(imageFile, "concierge-requests");
    } catch (uploadError) {
      console.error("Failed to upload concierge request image:", uploadError);
      return { success: false, error: "Failed to upload reference image" };
    }
  }

  try {
    await prisma.itemRequest.create({
      data: {
        description,
        imageUrl,
        userId: session.user.id,
        status: "PENDING",
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to create request:", error);
    return { success: false, error: "Failed to submit request" };
  }
}

export async function updateItemRequestStatus(id: string, status: "PENDING" | "REVIEWING" | "ACCEPTED" | "REJECTED") {
  const session = await auth();
  
  if ((session?.user as any)?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized access" };
  }

  try {
    await prisma.itemRequest.update({
      where: { id },
      data: { status },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to update request status:", error);
    return { success: false, error: "Failed to update status" };
  }
}
