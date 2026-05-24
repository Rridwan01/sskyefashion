import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { authConfig } from "../auth.config";
import { hashPassword } from "@/lib/hash";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) return null;

        const inputPassword = credentials.password as string;

        // If user has a password in the database, compare hashes
        if (user.password) {
          const hashedPassword = hashPassword(inputPassword);
          if (user.password !== hashedPassword) {
            return null;
          }
        } else {
          // Fallback check for seeded accounts without passwords set
          if (inputPassword !== "password") {
            return null;
          }
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
});
