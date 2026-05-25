import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { authConfig } from "../auth.config";
import { hashPassword } from "@/lib/hash";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET,
    }),
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
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user, account }) {
      if (user) {
        if (account && account.provider === "google") {
          // Look up user by email or create a new CUSTOMER record
          let dbUser = await prisma.user.findUnique({
            where: { email: user.email as string },
          });

          if (!dbUser) {
            dbUser = await prisma.user.create({
              data: {
                name: user.name,
                email: user.email as string,
                role: "CUSTOMER",
              },
            });
          }

          token.role = dbUser.role;
          token.id = dbUser.id;
        } else {
          token.role = (user as any).role;
          token.id = user.id;
        }
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
