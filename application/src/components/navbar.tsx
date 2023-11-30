import { getServerSession } from 'next-auth';
import { authOptions } from '@/config/NextAuth';
import dynamic from 'next/dynamic';
import AuthNavbar from './navbar/authnav';
import NoAuthNavBar from './navbar/noauth-navbar';
import useStorage from '@/hooks/useStorage';
import { getUser } from '@/utils/apiCalls';

export default async function NavbarDesktop() {
	// Loads faster
	if (useStorage().getItem('user', 'local')) {
		return <AuthNavbar />;
	}

	// Flashes white
	const session = await getServerSession(authOptions);
	return <>{session?.user ? <AuthNavbar /> : <NoAuthNavBar />}</>;
}
