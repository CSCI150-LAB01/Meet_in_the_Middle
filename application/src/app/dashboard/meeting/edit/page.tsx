'use client';
import { berlin } from '@/styles/fonts';
import { Button, Input, Textarea } from '@nextui-org/react';
import Link from 'next/link';
import { MdOutlineSearch } from 'react-icons/md';

export default function Edit() {
	return (
		<main className='flex justify-center flex-col px-0 w-full gap-y-5 min-h-screen'>
			<div className='px-5 flex gap-y-5 flex-col'>
				{/* Change color back to gray */}
				<h1
					className={`text-4xl ${berlin.className} text-zinc-600 text-center sm:text-left`}
				>
					Meeting Details
				</h1>
			</div>
			<div className='w-full flex h-full items-center item-end text-sm flex-col gap-4 grow'>
				<div className='w-full text-sm bg-primary rounded-t-2xl flex flex-col flex-1 grow p-6 items-center sm:items-start gap-5'>
					<Button color='secondary' className='w-full text-md'>
						Get Location Recommendation
					</Button>

					<div className='flex self-start flex-col gap-2 w-full'>
						<p className='text-white'>Who&apos;s Going?</p>
						<div className='min-h-[160px] flex items-center justify-center bg-white rounded-lg w-full'>
							No Friends Added
						</div>
					</div>
					<Button color='secondary' className='w-full text-md'>
						Invite Friends
					</Button>

					<Input
						label='Change Date / Time'
						labelPlacement='outside'
						type='datetime-local'
						id='birthdaytime'
						name='birthdaytime'
						placeholder='Enter a date here.'
						classNames={{
							label: 'text-white',
						}}
					/>

					<Link href='/dashboard' className='w-full'>
						<Button color='secondary' className='w-full text-md'>
							Save Meeting
						</Button>
					</Link>
				</div>
			</div>
		</main>
	);
}
