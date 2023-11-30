import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
	// may need to fix later
	adapter: MongoDBAdapter(clientPromise),
	session: {
		strategy: 'jwt',
	},
	pages: {
		// may need adjustment based on login route
		signIn: '/user/login',
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				try {
					const response = await fetch(
						process.env.NEXTAUTH_URI + '/api/signin',
						{
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify(credentials),
						},
					);

					if (response.status === 200) {
						const user = await response.json();
						return user;
					} else {
						throw new Error(`Authentication failed. Credentials Invalid.`);
					}
				} catch (error) {
					throw new Error(`Authentication failed ${error as string}`);
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				// Assign default values if none are supplied
				token.email = user.email;
				token.name = user.name;
				token.image = user.image ?? '';
				// token.defaultLocation = user.defaultLocation ?? [0, 0];
				// adjust default value structure
			}
			return token;
		},
		async session({ session, token }) {
			session.user.id = token.id;
			session.user.email = token.email;
			session.user.name = token.name;
			session.user.image = token.image;
			// session.user.defaultLocation = token.defaultLocation;
			return session;
		},
	},
};
