import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@lib/db";

export const authOptions = {
    // may need to fix later
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: 'jwt',
    },
    pages: {
        // may need adjustment based on login route
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
                    const response = await fetch("/api/signin", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(credentials)
                    })

                    const user = await response.json()
                    if (!user){
                        return null;
                    }
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
                    // Assign default values if none are supplied
                    token.email = user.email,
                    token.name = user.name,
                    token.image = user.image ?? "",
                    token.defaultLocation = user.defaultLocation ?? [0,0]
                    // adjust default value structure
            }
            return token
        },
        async session({ session, token }) {
            session.user.id = token.id
            session.user.email = token.email
            session.user.name = token.name
            session.user.image = token.image
            session.user.defaultLocation = token.defaultLocation
            return session
        }
    }
}