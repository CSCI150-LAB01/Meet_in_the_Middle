'use client';
import React from 'react';
import { Card, CardBody, Button } from '@nextui-org/react';
import { MdCalendarMonth, MdDelete, MdEdit } from 'react-icons/md';
import { formatDateTime } from '@/utils/utils';
import Link from 'next/link';

interface MeetingCardProps {
	title: string;
	date: string;
	editLink?: string; // New prop for the edit link
	onDelete?: () => void;
}

const MeetingCard: React.FC<MeetingCardProps> = ({
	title,
	date,
	editLink,
	onDelete,
}) => {
	return (
		<Card className='w-full shadow-sm'>
			<CardBody className='flex flex-row gap-2 w-full items-center'>
				<MdCalendarMonth />
				<div className='flex flex-col'>
					<p className='text-md font-bold text-secondary'>{title}</p>
					<p className='text-small text-default-500'>{formatDateTime(date)}</p>
				</div>
				{editLink && (
					<div className='ml-auto flex gap-2'>
						<Link href={editLink}>
							<Button
								color='primary'
								endContent={<MdEdit />}
								className='bg-zinc-200 text-zinc-700 sm:flex hidden'
							>
								Edit
							</Button>
						</Link>

						<Link href={editLink}>
							<Button
								color='primary'
								isIconOnly
								className='bg-zinc-200 text-zinc-700 sm:hidden text-center flex items-center justify-center'
							>
								<MdEdit className='text-[14px]' />
							</Button>
						</Link>
					</div>
				)}
			</CardBody>
		</Card>
	);
};

export default MeetingCard;
