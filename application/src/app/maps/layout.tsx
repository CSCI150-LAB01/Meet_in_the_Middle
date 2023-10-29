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
		<div className='flex flex-col items-center justify-center  w-full min-h-screen relative bg-transparent'>
			{children}
		</div>
	);
}
