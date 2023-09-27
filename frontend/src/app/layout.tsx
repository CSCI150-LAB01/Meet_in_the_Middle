import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import NavbarDesktop from "../components/navbar";
import localFont from 'next/font/local'

const inter = Inter({ subsets: ["latin"] });
const primaryFont = localFont({
	src: "./fonts/Berlin Sans FB Demi Bold.ttf",
	display: 'swap',
  })
 

export const metadata: Metadata = {
	title: "Meet In The Middle",
	description:
		"Find the best places for your group - restaurants, bars, cafes, arcades, and more. Get the best routes. Create a comprehensive plan. ",
	icons: [
		{
			rel: "apple-touch-icon",
			url: "/apple-icon.png",
		},
		{
			rel: "icon",
			type: "image/png",
			sizes: "32x32",
			url: "/favicon-32x32.png",
		},
		{
			rel: "icon",
			type: "image/png",
			sizes: "16x16",
			url: "/favicon-16x16.png",
		},
		{
			rel: "icon",
			url: "/favicon.ico",
		},
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={primaryFont.className + ' light'}>
			<body>
				{/* add navbar */}
				<NavbarDesktop />
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
