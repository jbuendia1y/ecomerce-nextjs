import NextAuth, { CredentialsSignin, NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/modules/auth/services/loginUser";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./db";

export const AuthMongoAdapter = MongoDBAdapter(client, {
  databaseName: "common",
});

export const authOptions: NextAuthConfig = {
  adapter: AuthMongoAdapter,
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
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
          throw new CredentialsSignin("Missing email or password");
        }
        const user = await loginUser({
          email: email as string,
          password: password as string,
        });
        if (!user) {
          throw new CredentialsSignin("Invalid email or password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  secret: process.env.AUTH_SECRET,
};

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);
