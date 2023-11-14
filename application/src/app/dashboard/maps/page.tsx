'use client';
import Map from '@/components/map';
import { Button, Input } from '@nextui-org/react';
import { MdOutlineSearch } from 'react-icons/md';

export default function Maps() {
	return (
		<>
			<div className='flex flex-col items-center justify-center absolute  w-full min-h-screen relative bg-transparent'>
				<div className='absolute top-[0] left-[0] z-[0]'>
					<Map
						height='100vh'
						width='100vw'
						options={{ disableDefaultUI: true, gestureHandling: 'greedy' }}
					/>
				</div>

				<div className='flex min-h-screen flex-col items-center pt-24 px-3 w-full max-w-[500px]'>
					<div className='flex items-start flex-col gap-2 w-full'>
						<Input
							classNames={{
								base: 'sm:max-w-[500px] h-10',
								mainWrapper: 'w-full h-full',
								input: 'text-small',
								inputWrapper: 'h-full font-normal bg-default-300/80',
							}}
							placeholder='Search for a location'
							size='sm'
							startContent={<MdOutlineSearch />}
							type='search'
							color='default'
						/>
						<Button variant='solid' color='primary' className='self-end'>
							View Location Suggestions
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
