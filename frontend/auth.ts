import NextAuth, { NextAuthConfig } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import client from "./lib/db";

export const authOptions: NextAuthConfig = {
  adapter: MongoDBAdapter(client, { databaseName: "COMMON" }),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "email and password",
      credentials: {
        email: {
          label: "Email*",
          type: "text",
        },
        password: { label: "Password *", type: "password" },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
    newUser: "/register",
    signOut: "/",
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);
