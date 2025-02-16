import NextAuth, { DefaultSession, NextAuthConfig, Session } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { StrapiError, StrapiLoginResponse } from "./modules/core/interfaces";
import { loginUser } from "./modules/auth/services/loginUser";
import { queryStrapi } from "./modules/core/strapi";
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
      async authorize(credentials) {
        // make sure the are credentials
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        const strapiLoginData = await loginUser({
          email: credentials!.email as string,
          password: credentials!.password as string,
        });
        const populateResponse = await getCurrentUserWithToken(
          strapiLoginData.jwt
        );

        if (!strapiLoginData.jwt || !strapiLoginData.user)
          throw new Error(
            (strapiLoginData as unknown as StrapiError).error.message
          );

        return {
          name: strapiLoginData.user.username,
          email: strapiLoginData.user.email,
          id: strapiLoginData.user.documentId,
          strapiUserId: strapiLoginData.user.documentId,
          blocked: strapiLoginData.user.blocked,
          strapiToken: strapiLoginData.jwt,
          role: populateResponse.role,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (
        account &&
        account.provider === "google" &&
        profile &&
        "email_verified" in profile
      ) {
        if (!profile.email_verified) return false;
      }
      return true;
    },

    async jwt({ token, trigger, account, user, session }) {
      if (trigger === "update") {
        if (session?.username) token.name = session.username;
        if (session?.strapiToken) token.strapiToken = session.strapiToken;
      }

      if (!account) return token;

      if (account.provider === "google") {
        const strapiResponse = await queryStrapi(
          `auth/${account.provider}/callback?access_token=${account.access_token}`,
          { cache: "no-cache" }
        );
        if (!strapiResponse.ok) {
          const strapiError: StrapiError = await strapiResponse.json();
          throw new Error(strapiError.error.message);
        }
        const strapiLoginResponse: StrapiLoginResponse =
          await strapiResponse.json();
        // customize token
        // name and email will already be on here
        token.strapiToken = strapiLoginResponse.jwt;
        token.strapiUserId = strapiLoginResponse.user.documentId;
        token.provider = account.provider;
        token.blocked = strapiLoginResponse.user.blocked;
      }
      if (account.provider === "credentials") {
        // The credintials provider is handled by authorize method of the provider
        token.strapiToken = user.strapiToken;
        token.strapiUserId = user.strapiUserId;
        token.provider = account.provider;
        token.blocked = user.blocked;
      }

      const populateResponse = await getCurrentUserWithToken(
        token.strapiToken as string
      );
      token.userRole = populateResponse.role;

      return token;
    },
    async session({ token, session }) {
      session.strapiToken = token.strapiToken as string;
      session.provider = token.provider as string;
      session.user.strapiUserId = token.strapiUserId as string;
      session.user.blocked = token.blocked as boolean;
      session.userRole = token.userRole as Session["user"]["role"];

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },

  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);
