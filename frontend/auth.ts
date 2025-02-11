import NextAuth, {
  DefaultSession,
  DefaultUser,
  NextAuthOptions,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { StrapiError, StrapiLoginResponse } from "./modules/core/interfaces";
import { loginUser } from "./modules/auth/services/loginUser";
import { queryStrapi } from "./modules/core/strapi";

declare module "next-auth" {
  interface User {
    strapiToken: string;
    strapiUserId: number;
    blocked: boolean;
  }

  interface Session extends DefaultSession {
    strapiToken: string;
    provider: string;
    user: {
      strapiUserId: number;
      blocked: boolean;
    } & DefaultUser;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "email and password",
      credentials: {
        identifier: {
          label: "Email or username *",
          type: "text",
        },
        password: { label: "Password *", type: "password" },
      },
      async authorize(credentials) {
        // make sure the are credentials
        if (!credentials || !credentials.identifier || !credentials.password) {
          return null;
        }
        const strapiLoginData = await loginUser({
          email: credentials!.identifier,
          password: credentials!.password,
        });
        if (!strapiLoginData.jwt || !strapiLoginData.user)
          throw new Error(
            (strapiLoginData as unknown as StrapiError).error.message
          );

        return {
          name: strapiLoginData.user.username,
          email: strapiLoginData.user.email,
          id: strapiLoginData.user.id.toString(),
          strapiUserId: strapiLoginData.user.id,
          blocked: strapiLoginData.user.blocked,
          strapiToken: strapiLoginData.jwt,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      // console.log('singIn callback', { account, profile, user });
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
      // console.log('jwt callback', {
      //   token,
      //   trigger,
      //   account,
      //   user,
      //   session,
      // });

      // change username update
      if (trigger === "update" && session?.username) {
        token.name = session.username;
      }

      // change password update
      if (trigger === "update" && session?.strapiToken) {
        token.strapiToken = session.strapiToken;
      }
      if (!account) return token;

      if (account.provider === "google") {
        // we now know we are doing a sign in using GoogleProvider
        try {
          const strapiResponse = await queryStrapi(
            `auth/${account.provider}/callback?access_token=${account.access_token}`,
            { cache: "no-cache" }
          );
          if (!strapiResponse.ok) {
            const strapiError: StrapiError = await strapiResponse.json();
            // console.log('strapiError', strapiError);
            throw new Error(strapiError.error.message);
          }
          const strapiLoginResponse: StrapiLoginResponse =
            await strapiResponse.json();
          // customize token
          // name and email will already be on here
          token.strapiToken = strapiLoginResponse.jwt;
          token.strapiUserId = strapiLoginResponse.user.id;
          token.provider = account.provider;
          token.blocked = strapiLoginResponse.user.blocked;
        } catch (error) {
          throw error;
        }
      }
      if (account.provider === "credentials") {
        // for credentials, not google provider
        // name and email are taken care of by next-auth or authorize
        token.strapiToken = user.strapiToken;
        token.strapiUserId = user.strapiUserId;
        token.provider = account.provider;
        token.blocked = user.blocked;
      }
      return token;
    },
    async session({ token, session }) {
      // console.log('session callback', {
      //   token,
      //   session,
      // });

      session.strapiToken = token.strapiToken as string;
      session.provider = token.provider as string;
      session.user.strapiUserId = token.strapiUserId as number;
      session.user.blocked = token.blocked as boolean;

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

export const {} = NextAuth(authOptions);
