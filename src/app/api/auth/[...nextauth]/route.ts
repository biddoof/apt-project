import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions = {

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;
        
        const user = await prisma.user.findUnique({
          where: { username: credentials.username.toLowerCase() }
        });

        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return { id: user.id, name: user.username };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async session({ session, token }: any) {
      if (session.user) {
        session.user.name = token.name;
        // @ts-ignore
        session.user.id = token.sub;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "apocalypse_secret_key_12345",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };