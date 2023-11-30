'use client';
import React from 'react';
import { Card, CardBody, Button } from '@nextui-org/react';
import { IoIosClose, IoMdCheckmark } from 'react-icons/io';
import { MdCalendarMonth, MdDelete } from 'react-icons/md';

interface NotificationCardProps {
	title: string;
	description: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
	title,
	description,
}) => {
	return (
		<Card className='w-full shadow-sm'>
			<CardBody className='flex flex-row gap-2 w-full items-center'>
				<MdCalendarMonth />
				<div className='flex flex-col'>
					<p className='text-md font-bold text-secondary'>{title}</p>
					<p className='text-small text-default-500'>{description}</p>
				</div>
			</CardBody>
		</Card>
	);
};

export default NotificationCard;
