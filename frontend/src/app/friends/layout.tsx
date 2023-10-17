import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Account",
};
export default function AccountLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen flex-col items-center lg:px-24 pt-12 w-full">
			{children}
		</div>
	);
}
