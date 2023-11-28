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
	return <>{children}</>;
}
