import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Dashboard',
};
export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='flex w-full justify-center'>
			<div className='flex min-h-screen flex-col items-center lg:px-24 py-24 w-full max-w-[1080px]'>
				{children}
			</div>
		</div>
	);
}
