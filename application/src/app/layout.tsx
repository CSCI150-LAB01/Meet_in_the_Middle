import '@/styles/globals.scss';
import type { Metadata } from 'next';
import { Providers } from './providers';
import NavbarDesktop from '../components/navbar';
import { roboto } from '@/styles/fonts';
import { AppConfig } from '@/utils/AppConfig';
import Footer from '@/components/footer';
import 'react-modern-drawer/dist/index.css';

// Metadata
export const metadata: Metadata = {
	title: {
		template: `${AppConfig.short_name} - %s`,
		default: AppConfig.title,
	},
	description: AppConfig.description,
	colorScheme: 'only light',
	icons: [
		{
			rel: 'apple-touch-icon',
			url: '/apple-icon.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			url: '/favicon-32x32.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '16x16',
			url: '/favicon-16x16.png',
		},
		{
			rel: 'icon',
			url: '/favicon.ico',
		},
	],
};

// Default Page Layout
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className={roboto.className + ' light'}>
			<body className='light'>
				<Providers>
					<NavbarDesktop />
					{children}
				</Providers>
				<Footer />
			</body>
		</html>
	);
}
