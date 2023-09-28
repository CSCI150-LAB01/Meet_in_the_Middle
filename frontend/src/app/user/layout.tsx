import Image from "next/image";
export default function UserLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen flex-col items-center p-24 w-full">
			<div className="max-w-xs w-full h-lg flex items-center justify-between font-mono text-sm flex-col gap-4 p-5">
                {children}
            </div>
        </div>
	);
}
