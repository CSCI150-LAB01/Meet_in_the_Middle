import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Sign Up',
};

export default function UserLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
