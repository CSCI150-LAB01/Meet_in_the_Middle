'use client';
import React from 'react';
import { Card, CardBody, Avatar, Button } from '@nextui-org/react';
import { MdAdd } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import { getUser, sendFriendRequest } from '@/utils/apiCalls';
import 'react-toastify/dist/ReactToastify.css';

export default function FriendCard({
	name,
	email,
	id,
	add = false,
}: {
	name: string;
	id: string;
	email: string;
	add: boolean | null;
}) {
	const toastPosition = toast.POSITION.BOTTOM_LEFT;
	const handleAdd = async () => {
		try {
			const data = await getUser();
			const response = await sendFriendRequest(
				data._id,
				'I want to be friends.',
				id,
			);
			if (!response) {
				toast.success('Friend request sent.', { position: toastPosition });
			} else {
				toast.error(response, {
					position: toastPosition,
				});
			}
		} catch (error) {
			console.error('Error adding friend:', error);
			toast.error('An error occurred while sending friend request.', {
				position: toastPosition,
			});
		}
	};

	return (
		<>
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
							onClick={handleAdd}
						>
							<MdAdd size='25px' />
						</Button>
					) : (
						''
					)}
				</CardBody>
			</Card>
			<div className='absolute'>{add ? <ToastContainer /> : ''}</div>
		</>
	);
}
