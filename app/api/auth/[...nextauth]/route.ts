import NextAuth from "next-auth"
import {env} from "@/lib/env.mjs";
import GoogleProvider from "next-auth/providers/google";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
export const authOptions = {
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }