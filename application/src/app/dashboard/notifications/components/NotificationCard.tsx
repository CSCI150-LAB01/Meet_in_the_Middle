import React from 'react';
import { Card, CardBody, Avatar, Button } from '@nextui-org/react';
import { IoIosClose, IoMdCheckmark } from 'react-icons/io';
import { MdDelete } from 'react-icons/md'; // Import the delete icon
import { deleteNotification } from '@/utils/apiCalls';

interface NotificationCardProps {
	name: string;
	description: string;
	avatarSrc?: string;
	showYesIcon?: boolean;
	showNoIcon?: boolean;
	showDeleteIcon?: boolean;
	notificationId: string;
	onDelete: () => void;
	userId: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
	name,
	description,
	avatarSrc,
	showYesIcon = false,
	showNoIcon = false,
	showDeleteIcon = false,
	userId,
	onDelete,
	notificationId,
}) => {
	const handleDelete = async () => {
		try {
			await deleteNotification(userId, notificationId);
			onDelete(); // Trigger the callback to update the UI
		} catch (error) {
			console.error('Error deleting notification:', error);
		}
	};
	return (
		<Card className='w-full shadow-sm'>
			<CardBody className='flex flex-row gap-2 w-full items-center'>
				<Avatar
					src={avatarSrc ?? avatarSrc}
					className='w-10 h-10 text-tiny z-[0]'
				/>
				<div className='flex flex-col'>
					<p className='text-md font-bold text-secondary'>{name}</p>
					<p className='text-small text-default-500'>{description}</p>
				</div>
				<div className='flex gap-2 ml-auto items-center '>
					{showYesIcon && (
						<Button
							isIconOnly
							color='primary'
							aria-label='Like'
							className='text-2xl'
						>
							<IoMdCheckmark />
						</Button>
					)}
					{showNoIcon && (
						<Button
							isIconOnly
							color='primary'
							className='bg-zinc-200 text-danger text-2xl'
							aria-label='Like'
						>
							<IoIosClose />
						</Button>
					)}
					{showDeleteIcon && (
						<Button
							isIconOnly
							color='primary'
							className='bg-zinc-200 text-zinc-500 text-xl'
							aria-label='Delete'
							onClick={handleDelete}
						>
							<MdDelete />
						</Button>
					)}
				</div>
			</CardBody>
		</Card>
	);
};

export default NotificationCard;
