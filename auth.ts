import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { NextResponse } from "next/server";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma/prisma";

// Debug logging
console.log("Environment check:", {
  hasGitHubId: !!process.env.AUTH_GITHUB_ID,
  hasGitHubSecret: !!process.env.AUTH_GITHUB_SECRET,
  hasDatabaseUrl: !!process.env.DATABASE_URL,
  nodeEnv: process.env.NODE_ENV
});

export const { handlers, signIn, signOut, auth } = NextAuth({

  providers: [Google, GitHub],

  callbacks: {
    authorized({
        auth,
        request:{nextUrl}
    }){
        const isLoggedIn = !! auth?.user; //auth?.user return object but since we need boolean we use !!
        const isOnDashboard = nextUrl.pathname.includes('/dashboard');

        if(isOnDashboard){
            if(isLoggedIn){
                return true;
            }else{
                return false;
            }
        }else if(!isLoggedIn && isOnDashboard){
            return NextResponse.redirect(new URL('/api/auth/signin', nextUrl))
        }
        return true;
    }
  },

  // for prisma setup to save loggedin user
  session: {
    strategy: 'jwt',
  },

  adapter: PrismaAdapter(prisma),

  debug: true, // Enable debug mode to see more detailed logs
})
