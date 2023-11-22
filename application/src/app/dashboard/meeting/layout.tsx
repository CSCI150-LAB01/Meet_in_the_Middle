import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Meetings',
};
export default function MeetingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='flex min-h-screen flex-col items-center lg:px-24 pt-24 w-full'>
			{children}
		</div>
	);
}
