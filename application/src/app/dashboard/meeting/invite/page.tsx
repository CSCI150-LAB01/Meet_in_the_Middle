'use client';
import { berlin } from '@/styles/fonts';
import { Input } from '@nextui-org/react';
import { MdOutlineSearch } from 'react-icons/md';
import FriendCard from '../../friends/components/Card';

export default function Invite() {
	return (
		<main className='flex justify-center flex-col px-0 w-full gap-y-5 min-h-screen'>
			<div className='px-5 flex gap-y-5 flex-col'>
				{/* Change color back to gray */}
				<h1
					className={`text-3xl ${berlin.className} text-zinc-500 text-center sm:text-left`}
				>
					Invite Friends
				</h1>
				<Input
					classNames={{
						base: 'sm:max-w-[500px] h-10',
						mainWrapper: 'w-full h-full',
						input: 'text-small',
						inputWrapper:
							'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
					}}
					placeholder='Search an email or name...'
					size='sm'
					startContent={<MdOutlineSearch />}
					type='search'
					variant='bordered'
					color='primary'
				/>
			</div>
			<div className='w-full flex h-full items-center item-end text-sm flex-col gap-4 grow'>
				<div className='w-full text-sm bg-primary rounded-t-2xl flex flex-col flex-1 grow py-5 px-5 items-center sm:items-start'>
					<div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full'>
						<p>You have no friends.</p>
					</div>
				</div>
			</div>
		</main>
	);
}
