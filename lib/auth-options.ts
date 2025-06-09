import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import type { NextAuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { User } from "./models/user";
import clientPromise, { connectToDB } from "./mongodb";

async function refreshAccessToken(token: JWT) {
  try {
    if (!token.refreshToken) {
      console.log("No refresh token available");
      return { ...token, error: "NoRefreshTokenAvailable" };
    }

    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        refresh_token: token.refreshToken as string,
        grant_type: "refresh_token",
      }).toString(),
    });

    const responseBody = await response.text();
    if (!response.ok) {
      console.error("Token refresh failed:", responseBody);
      return { ...token, error: "RefreshFailed" };
    }

    const refreshedTokens = JSON.parse(responseBody);
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires:
        Date.now() + (refreshedTokens.expires_in || 3600) * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: "portfolio",
  }) as Adapter,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const client = await clientPromise;
        const db = client.db("portfolio");
        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (!user || !user.password) throw new Error("Invalid credentials");

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isMatch) throw new Error("Invalid credentials");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          isAdmin: user.isAdmin || false,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },

  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      if (user?.id) {
        try {
          await connectToDB();
          await User.findByIdAndUpdate(user.id, {
            $set: { lastLogin: new Date() },
            $push: {
              loginHistory: {
                timestamp: new Date(),
                ip: "127.0.0.1",
                userAgent: "unknown",
              },
            },
          });
        } catch (err) {
          console.error("Login history update failed:", err);
        }
      }

      if (account?.provider === "google") {
        const client = await clientPromise;
        const db = client.db("portfolio");
        const existingUser = await db
          .collection("users")
          .findOne({ email: user.email });

        if (existingUser) {
          const existingAccount = await db.collection("accounts").findOne({
            provider: "google",
            providerAccountId: account.providerAccountId,
          });

          if (!existingAccount) {
            await db.collection("accounts").insertOne({
              provider: "google",
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              expires_at: account.expires_at,
              refresh_token: account.refresh_token,
              token_type: account.token_type,
              scope: account.scope,
              userId: existingUser._id,
            });
          }

          user.id = existingUser._id.toString();
          user.isAdmin = existingUser.isAdmin || false;
        }
      }

      return true;
    },

    async jwt({ token, user, account }) {
      if (account && user) {
        if (account.provider === "google") {
          return {
            ...token,
            id: user.id,
            isAdmin: user.isAdmin || false,
            accessToken: account.access_token,
            accessTokenExpires: account.expires_at && account.expires_at * 1000,
            refreshToken: account.refresh_token,
          };
        }

        if (account.provider === "credentials") {
          return {
            ...token,
            id: user.id,
            isAdmin: user.isAdmin || false,
            accessToken: crypto.randomUUID(),
          };
        }
      }

      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }

      if (token.refreshToken) {
        return await refreshAccessToken(token);
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin ?? false;
        session.accessToken = token.accessToken;
      }
      return session;
    },

    redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  debug: process.env.NODE_ENV === "development",
};
