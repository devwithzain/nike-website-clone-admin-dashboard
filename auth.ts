import NextAuth from "next-auth";
import prisma from "@/lib/prisma";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
   adapter: PrismaAdapter(prisma),
   callbacks: {
      async session({ session, token }) {
         if (token.sub && session.user) {
            session.user.id = token.sub;
         }
         return session;
      },
      async jwt({ token }) {
         return token;
      }
   },
   session: {
      strategy: "jwt"
   },
   ...authConfig
});