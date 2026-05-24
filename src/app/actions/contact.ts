"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/server/auth";

export async function submitContactInquiry(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !subject || !message) {
    return { success: false, error: "All fields are required" };
  }

  if (name.trim() === "" || email.trim() === "" || subject.trim() === "" || message.trim() === "") {
    return { success: false, error: "Fields cannot be blank" };
  }

  try {
    await prisma.contactInquiry.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to submit contact inquiry:", error);
    return { success: false, error: "Failed to submit inquiry. Please try again." };
  }
}

export async function bookShowroomAppointment(formData: FormData) {
  const session = await auth();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const showroom = formData.get("showroom") as string;
  const dateStr = formData.get("date") as string;
  const timeSlot = formData.get("timeSlot") as string;
  const notes = formData.get("notes") as string;

  if (!name || !email || !showroom || !dateStr || !timeSlot) {
    return { success: false, error: "Please fill out all required fields" };
  }

  const validShowrooms = ["Ibadan Atelier", "NYC SoHo Atelier", "Paris Rue Saint-Honoré"];
  if (!validShowrooms.includes(showroom)) {
    return { success: false, error: "Invalid showroom selection" };
  }

  try {
    const parsedDate = new Date(dateStr);
    if (isNaN(parsedDate.getTime())) {
      return { success: false, error: "Invalid date selected" };
    }

    await prisma.showroomAppointment.create({
      data: {
        userId: session?.user?.id || null,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        showroom,
        date: parsedDate,
        timeSlot,
        notes: notes?.trim() || null,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to book showroom appointment:", error);
    return { success: false, error: "Failed to book appointment. Please try again." };
  }
}
