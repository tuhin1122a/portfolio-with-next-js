import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import type { Adapter } from "next-auth/adapters";
import clientPromise, { connectToDB } from "./mongodb"; // Assuming connectToDB is handled in clientPromise
import bcrypt from "bcryptjs";
import type { JWT } from "next-auth/jwt";


// Function to handle token rotation
async function refreshAccessToken(token: JWT) {
  try {
    // Skip refresh if no refresh token available
    if (!token.refreshToken) {
      console.log("No refresh token available, skipping token refresh");
      return {
        ...token,
        error: "NoRefreshTokenAvailable",
      };
    }

    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID || '',
        client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
        refresh_token: token.refreshToken as string,
        grant_type: "refresh_token",
      }).toString(),
    });

    // Get the response body for better error handling
    const responseBody = await response.text();
    
    if (!response.ok) {
      console.error("Token refresh failed:", responseBody);
      return {
        ...token,
        error: `RefreshError: ${response.status}`,
      };
    }

    const refreshedTokens = JSON.parse(responseBody);

    if (!refreshedTokens.access_token) {
      console.error("No access token in refresh response:", refreshedTokens);
      return {
        ...token,
        error: "NoAccessTokenInResponse",
      };
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + (refreshedTokens.expires_in || 3600) * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: "portfolio",
  }) as any as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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

        try {
          const client = await clientPromise;
          const db = client.db("portfolio");
          const user = await db.collection("users").findOne({ email: credentials.email });

          if (!user || !user.password) {
            throw new Error("Invalid credentials");
          }

          const passwordMatch = await bcrypt.compare(credentials.password, user.password);

          if (!passwordMatch) {
            throw new Error("Invalid credentials");
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
            isAdmin: user.isAdmin || false,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
       
      },
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      const client = await clientPromise;
      const db = client.db("portfolio");

       // Update last login and login history
      if (user.id) {
        try {
          await connectToDB()

          // Get client IP and user agent (in a real app, you'd get these from the request)
          const loginInfo = {
            timestamp: new Date(),
            ip: "127.0.0.1", // Placeholder
            userAgent: "Unknown", // Placeholder
          }

          await User.findByIdAndUpdate(user.id, {
            $set: { lastLogin: new Date() },
            $push: { loginHistory: loginInfo },
          })
        } catch (error) {
          console.error("Error updating login history:", error)
          // Continue with sign in even if history update fails
        }
      }

      // Handle Google sign-in
      if (account?.provider === "google") {
        try {
          const existingUser = await db.collection("users").findOne({ email: user.email });

          if (existingUser) {
            // Check if this Google account is already linked
            const existingAccount = await db.collection("accounts").findOne({
              provider: "google",
              providerAccountId: account.providerAccountId,
            });

            if (!existingAccount) {
              // Link Google account to existing user
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
            // Update user ID to match existing user
            user.id = existingUser._id.toString();
            user.isAdmin = existingUser.isAdmin || false;
          }
          // If no existing user, MongoDBAdapter will create one automatically
          return true;
        } catch (error) {
          console.error("SignIn error for Google:", error);
          return false;
        }
      }

      // Allow Credentials sign-in to proceed
      return true;
    },
  async jwt({ token, user, account }) {
  // Initial sign-in
  if (account && user) {
    return {
      ...token,
      accessToken: account.access_token,
      accessTokenExpires: account.expires_at ? account.expires_at * 1000 : Date.now() + 60 * 60 * 1000,
      refreshToken: account.refresh_token,
      id: user.id,
      isAdmin: user.isAdmin || false,
    };
  }

  // Return previous token if the access token has not expired yet
  if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
    return token;
  }

  // If there was a previous refresh error or no refresh token, 
  // extend the current token's lifetime rather than failing
  if (token.error || !token.refreshToken) {
    console.log("Skipping token refresh due to previous error or missing refresh token");
    return {
      ...token,
      accessTokenExpires: Date.now() + 60 * 60 * 1000, // Extend by 1 hour
    };
  }

  // Refresh token has expired, try to update it
  const refreshedToken = await refreshAccessToken(token);
  return refreshedToken;
},
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin ?? false;
        session.accessToken = token.accessToken;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  debug: process.env.NODE_ENV === "development",
};