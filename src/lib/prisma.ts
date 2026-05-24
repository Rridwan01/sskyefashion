import { PrismaClient } from "@prisma/client";

// Fallback logic to map Vercel's auto-generated Supabase Integration env vars
if (process.env.POSTGRES_PRISMA_URL && (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes("localhost"))) {
  process.env.DATABASE_URL = process.env.POSTGRES_PRISMA_URL;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
