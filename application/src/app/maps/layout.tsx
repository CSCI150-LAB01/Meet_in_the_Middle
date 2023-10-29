import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Itineraries',
};
export default function ItinerariesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='flex min-h-screen flex-col items-center w-full'>
			{children}
		</div>
	);
}
