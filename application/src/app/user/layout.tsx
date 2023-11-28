import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Sign In / Sign Up',
};
export default function UserLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='h-screen flex pt-24'>
			<div className='flex flex-col items-center justify-between px-0 md:px-24 w-full flex-1 md:py-4 md:flex-row md:justify-around'>
				<Image
					src='/assets/mitm_logo.svg'
					width={250}
					height={250}
					alt='Meet In The Middle Logo'
					className='md:hidden'
				/>
				<p className='hidden md:block'>
					@TODO: Maybe put something on this side on desktop, wait for UI/UX
				</p>
				<div className='w-full flex items-center item-end text-sm flex-col gap-4 grow md:max-w-sm'>
					{children}
				</div>
			</div>
		</div>
	);
}
