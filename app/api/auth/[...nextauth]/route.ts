import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import { useSession } from "next-auth/react"

import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
    };
  }
}

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      // @ts-expect-error
      clientId: process.env.GOOGLE_CLIENT_ID,
      // @ts-expect-error
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
  ],
  pages: {
    newUser: "/user",
    signIn: "/signin"
  },
  callbacks: {
    session({ session, user }: any) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }