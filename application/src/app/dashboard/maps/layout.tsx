import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Maps',
};
export default function MapsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
