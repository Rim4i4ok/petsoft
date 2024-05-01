import bcrypt from "bcryptjs";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { authSchema } from "@/lib/validations";
import { getUserByEmail } from "./utils.prisma";
import { sleep } from "./utils.client";

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
        // runs on log in
        // validation
        const validatedFormData = authSchema.safeParse(credentials);
        if (!validatedFormData.success) {
          return null;
        }

        // extract values
        const { email, password } = validatedFormData.data;

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
      const isLoggedIn = Boolean(auth?.user);
      const isTryingToAccessApp = request.nextUrl.pathname.includes("/app");
      const nextPath = request.nextUrl.pathname;

      if (!isLoggedIn) {
        return isTryingToAccessApp ? false : true;
      }

      if (isTryingToAccessApp) {
        if (!auth?.user.hasAccess) {
          return Response.redirect(new URL("/payment", request.nextUrl));
        } else {
          return true;
        }
      }

      if (nextPath.includes("/login") || nextPath.includes("/signup")) {
        if (auth?.user.hasAccess) {
          return Response.redirect(new URL("/app/dashboard", request.nextUrl));
        } else {
          return Response.redirect(new URL("/payment", request.nextUrl));
        }
      }

      // Existing logged-in user not trying to access "/app"
      if (!auth?.user.hasAccess) {
        return Response.redirect(new URL("/payment", request.nextUrl));
      }

      return false;
    },
    redirect: async ({ baseUrl, url }) => {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    jwt: async ({ token, user, trigger }) => {
      if (user) {
        // on sign in
        token.userId = user.id;
        token.email = user.email!;
        token.hasAccess = user.hasAccess;
      }

      if (trigger === "update") {
        await sleep(2000);

        // on every request
        const userFromDb = await getUserByEmail(token.email);
        if (userFromDb) {
          token.hasAccess = userFromDb.hasAccess;
        }
      }

      return token;
    },
    session: ({ session, token }) => {
      session.user.id = token.userId;
      session.user.hasAccess = token.hasAccess;

      return session;
    },
  },
} satisfies NextAuthConfig;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
