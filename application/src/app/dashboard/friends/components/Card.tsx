'use client';
import React, { useState } from 'react';
import { Card, CardBody, Avatar, Button } from '@nextui-org/react';
import { MdAdd, MdCheck, MdClose } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	acceptFriendRequest,
	getUser,
	sendFriendRequest,
} from '@/utils/apiCalls';

interface FriendCardProps {
	name: string;
	id: string;
	email: string;
	add?: boolean | null;
	accept?: boolean | null;
	reject?: boolean | null;
	senderId?: string | null;
	onAccept?: () => void;
}

const FriendCard: React.FC<FriendCardProps> = ({
	name,
	email,
	id,
	add = false,
	accept = false,
	reject = false,
	senderId,
	onAccept,
}) => {
	const [added, setAdded] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false); // New loading state
	const toastPosition = toast.POSITION.BOTTOM_LEFT;

	const handleAdd = async () => {
		if (added || loading) {
			return;
		}

		setLoading(true);

		try {
			const data = await getUser();
			const response = await sendFriendRequest(
				data._id,
				'I want to be friends.',
				id,
			);

			if (
				response &&
				response.message === 'Friend Request sent and Notification created'
			) {
				toast.success('Friend request sent.', { position: toastPosition });
				setAdded(true);
			} else {
				console.error('There was an error adding this friend...');
				toast.error('There was an error adding this friend...', {
					position: toastPosition,
				});
			}
		} catch (error) {
			console.error('There was an error adding this friend...');
			toast.error('There was an error adding this friend...', {
				position: toastPosition,
			});
		} finally {
			setLoading(false);
		}
	};

	const handleReject = async () => {
		// Handle reject logic here
	};

	const handleAccept = async () => {
		setLoading(true);
		if (!senderId || !onAccept) return;
		await acceptFriendRequest(id, senderId);
		setLoading(false);
		onAccept();
	};

	return (
		<>
			<Card className='max-w-[400px] w-full'>
				<CardBody className='w-full flex flex-row items-center gap-2'>
					<div className='flex gap-3 float-left justify-start w-full'>
						<Avatar radius='full' size='lg' name={name} className='z-[1]' />
						<div className='flex flex-col gap-1 items-start justify-center '>
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
							className='float-right justify-self-end'
							onClick={handleAdd}
							disabled={loading || added} // Disable the button while loading or if already added
							isLoading={loading}
						>
							{loading ? <div className='loader' /> : <MdAdd size='25px' />}
						</Button>
					) : null}
					{accept ? (
						<Button
							isIconOnly
							color='primary'
							variant='solid'
							aria-label='Take a photo'
							className='justify-self-end'
							onClick={handleAccept}
							disabled={loading || added} // Disable the button while loading or if already added
							isLoading={loading}
						>
							<MdCheck size='25px' />
						</Button>
					) : null}
					{reject ? (
						<Button
							isIconOnly
							color='secondary'
							variant='solid'
							aria-label='Take a photo'
							className='justify-self-end bg-zinc-200 text-zinc-500'
							onClick={handleReject}
						>
							<MdClose size='25px' />
						</Button>
					) : null}
				</CardBody>
			</Card>
			<div className='absolute'>{add ? <ToastContainer /> : null}</div>
		</>
	);
};

export default FriendCard;
