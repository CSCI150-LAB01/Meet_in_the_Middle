import Image from 'next/image';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/config/NextAuth';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Dashboard',
};
export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);

	if (!session) {
		return (
			<>
				<div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center'>
					<h1 className='text-4xl text-primary mb-4'>404 - Page Not Found</h1>
					<p className='text-lg text-gray-600'>
						It seems you are not logged in.
					</p>
					<Link href='/user/login'>
						<button className='mt-2 bg-primary text-white py-2 px-4 rounded-full hover:bg-green-800'>
							Click here to Login
						</button>
					</Link>
				</div>
			</>
		);
	}
	return <>{children}</>;
}
