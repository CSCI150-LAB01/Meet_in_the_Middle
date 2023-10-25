import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@lib/db";

export const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: "/signin"
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const response = await fetch("/api/auth/signin", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(credentials)
                    })

                    const user = await response.json()
                    return user;
                } catch (error) {
                    return null;
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id,
                    token.email = user.email,
                    token.name = user.name,
                    token.image = user.image
            }
            return token
        },
        async session({ session, token }) {
            session.user.id = token.id
            session.user.email = token.email
            session.user.name = token.name
            session.user.image = token.image
            return session
        }
    }
}