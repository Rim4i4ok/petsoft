import bcrypt from "bcryptjs";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import { getUserByEmail } from "./utils.prisma";

const config = {
  pages: {
    signIn: "/login",
  },
  //   session: {
  //     maxAge: 30 * 24 * 60 * 60,
  //     strategy: "jwt",
  //   },
  providers: [
    Credentials({
      async authorize(credentials) {
        // runs on login
        const { email, password } = credentials;

        const user = await getUserByEmail(email);
        if (!user) {
          console.log("User not found");
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword,
        );
        if (!passwordMatch) {
          console.log("Invalid credentials");
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      // runs on every request with middleware
      const isLoggedIn = Boolean(auth?.user);
      const isTryingToAccessApp = request.nextUrl.pathname.includes("/app");

      // No logged-in user, redirect all attempts to access "/app" to login
      if (!isLoggedIn) {
        return isTryingToAccessApp ? false : true;
      }

      // Existing logged-in user
      if (isLoggedIn) {
        // Redirect user to dashboard when they're not trying to access "/app"
        if (!isTryingToAccessApp) {
          return Response.redirect(new URL("/app/dashboard", request.nextUrl));
        }

        // Allow the logged-in user to access "/app"
        return true;
      }

      // Catch all - should ideally not reach here
      return false;
    },
    redirect: async ({ baseUrl, url }) => {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    jwt: ({ token, user }) => {
      if (user) {
        // on sign in
        token.userId = user.id;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.userId;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth(config);
