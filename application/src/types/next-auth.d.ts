import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

// common interface for JWT and Session
type MITMUser = DefaultUser & {
	// defaultLocation: [number, number];
};

type MITMSession = DefaultSession & {
  user?: MITMUser;
};


declare module 'next-auth/jwt' {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	interface JWT extends MITMUser {}
}

declare module 'next-auth' {
	interface User extends MITMUser {}
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	// interface Session {
	// 	user?: User;
	// }
  interface Session {
    user: {
      /** Oauth access token */
      token?: accessToken;
    } & MITMSession["user"];
  }
}
