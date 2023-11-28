import React from 'react';
import { Card, CardBody, Avatar, Button } from '@nextui-org/react';
import { MdAdd } from 'react-icons/md';

export default function FriendCard() {
	return (
		<Card className='max-w-[400px] w-full '>
			<CardBody className='justify-between flex-row items-center'>
				<div className='flex gap-3 float-left w-min justify-center'>
					<Avatar radius='full' size='lg' name='Joe Schmo' className='z-[1]' />
					<div className='flex flex-col gap-1 items-start justify-center'>
						<h4 className='text-small font-semibold leading-none text-default-600'>
							Joe Schmo
						</h4>
						<h5 className='text-small tracking-tight text-default-400'>
							joeschmo@gmail.com
						</h5>
					</div>
				</div>
				<Button
					isIconOnly
					color='secondary'
					variant='solid'
					aria-label='Take a photo'
					className='float-right'
				>
					<MdAdd size='25px' />
				</Button>
			</CardBody>
		</Card>
	);
}
