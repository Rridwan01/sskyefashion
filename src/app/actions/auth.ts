"use server";

import { signIn } from "@/server/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { hashPassword } from "@/lib/hash";
import { prisma } from "@/lib/prisma";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
  
  redirect("/dashboard");
}

export async function registerUser(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      return "All fields are required.";
    }

    // Verify email structure
    if (!email.includes("@")) {
      return "Invalid email address.";
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return "Email already registered.";
    }

    // Hash password and insert client
    const hashedPassword = hashPassword(password);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "CUSTOMER",
      },
    });

  } catch (error: any) {
    console.error("Registration failed:", error);
    return error.message || "Failed to submit application.";
  }

  redirect("/auth/signin");
}
