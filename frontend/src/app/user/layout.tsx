import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Sign In / Sign Up",
};
export default function UserLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen flex-col items-center lg:px-24 py-24 w-full">
			<div className="max-w-xs w-full h-lg flex items-center justify-between text-sm flex-col gap-4 ">
				{children}
			</div>
		</div>
	);
}
