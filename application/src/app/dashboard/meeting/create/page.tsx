'use client';
import { berlin } from '@/styles/fonts';
import { Button, Input, Textarea } from '@nextui-org/react';
import Link from 'next/link';
import { MdOutlineSearch } from 'react-icons/md';

export default function Create() {
	return (
		<main className='flex justify-center flex-col px-0 w-full gap-y-5 min-h-screen'>
			<div className='px-5 flex gap-y-5 flex-col'>
				{/* Change color back to gray */}
				<h1
					className={`text-4xl ${berlin.className} text-zinc-600 text-center sm:text-left`}
				>
					Create a Meeting
				</h1>
			</div>
			<div className='w-full flex h-full items-center item-end text-sm flex-col gap-4 grow'>
				<div className='w-full text-sm bg-primary rounded-t-2xl flex flex-col flex-1 grow p-6 items-center sm:items-start gap-5'>
					<Input
						label='Title'
						placeholder='Event/Meeting Title'
						classNames={{
							label: 'text-white',
						}}
						labelPlacement='outside'
					/>
					<Textarea
						label='Description'
						placeholder='Enter your description'
						classNames={{
							label: 'text-white',
						}}
						labelPlacement='outside'
						minRows={10}
					/>
					<Input
						label='Pick Date / Time'
						labelPlacement='outside'
						type='datetime-local'
						id='birthdaytime'
						name='birthdaytime'
						placeholder='Enter a date here.'
						classNames={{
							label: 'text-white',
						}}
					/>
					<Link href='/dashboard/meeting/edit' className='w-full'>
						<Button color='secondary' className='w-full text-md'>
							Create Meeting
						</Button>
					</Link>
				</div>
			</div>
		</main>
	);
}
