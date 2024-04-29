import bcrypt from "bcryptjs";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";

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

        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
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
  },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth(config);
