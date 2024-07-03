import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"; // Connects prisma(sqlite) to nextauth
import { db } from "./db";
import GitHub from "@auth/core/providers/github"; // the provider for nextauth

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID; // assigns github_client_id to a variable
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET; // assigns github_client_secret to a variable

// Checks if both github_client_id and github_client_secret are present. If not it throws an error
if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    throw new Error('Missing github OAuth Credentials')
}

// Destructures GET, POST, auth, signOut, and signIn from NextAuth
export const { handlers: { GET, POST }, auth, signOut, signIn } = NextAuth({
    adapter: PrismaAdapter(db),  // assigns the adapter as PrismaAdapter and sets the db to it
    
    // Assigns clientId and clientSecret to github function
    providers: [
        GitHub({
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET
        })
    ],
    callbacks: {
        // Usually not needed, this is to fix a bug with nextauth
        async session({ session, user}: any) {
            if (session && user) {
                session.user.id = user.id;
            }

            return session;
        }
    }
})