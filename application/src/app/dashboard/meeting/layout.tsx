import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Meeting',
};
export default function MeetingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='flex min-h-screen flex-col items-center justify-center lg:px-24 sm:pt-[unset] pt-24 w-full'>
			{children}
		</div>
	);
}
