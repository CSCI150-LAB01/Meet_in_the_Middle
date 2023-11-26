import React from 'react';
import { Card, CardBody, Avatar, Button } from '@nextui-org/react';
import { MdAdd } from 'react-icons/md';

export default function FriendCard({
	name,
	email,
	add = false,
}: {
	name: string;
	email: string;
	add: boolean | null;
}) {
	return (
		<Card className='max-w-[400px] w-full'>
			<CardBody className='justify-between flex-row items-center'>
				<div className='flex gap-3 float-left w-min justify-center'>
					<Avatar radius='full' size='lg' name={name} className='z-[1]' />
					<div className='flex flex-col gap-1 items-start justify-center'>
						<h4 className='text-small font-semibold leading-none text-default-600'>
							{name}
						</h4>
						<h5 className='text-small tracking-tight text-default-400'>
							{email}
						</h5>
					</div>
				</div>
				{add ? (
					<Button
						isIconOnly
						color='secondary'
						variant='solid'
						aria-label='Take a photo'
						className='float-right'
					>
						<MdAdd size='25px' />
					</Button>
				) : (
					''
				)}
			</CardBody>
		</Card>
	);
}
