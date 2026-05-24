import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { authConfig } from "../auth.config";

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

        // In a real app, you would hash the password and compare it
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        // Demo logic: allow any login if they type 'password' or if the user exists
        if (user || credentials.password === "password") {
          return {
            id: user?.id || "demo-id",
            name: user?.name || "Demo User",
            email: credentials.email as string,
            role: user?.role || "CUSTOMER",
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        // @ts-ignore
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
