import React from 'react';
import { Card, CardBody, Avatar, Button } from '@nextui-org/react';
import { MdCheck, MdClose } from 'react-icons/md';
import { formatDateTime } from '@/utils/utils';
import { getUserInfo } from '@/utils/apiCalls';

interface MeetingInviteCardProps {
	title: string;
	date: string;
	owner: string;
	onAccept?: () => void;
	onReject?: () => void;
}

const MeetingInviteCard: React.FC<MeetingInviteCardProps> = ({
	title,
	date,
	owner,
	onAccept,
	onReject,
}) => {
	return (
		<Card className='min-h-[100px] w-full'>
			<CardBody className='w-full flex flex-row items-center gap-2'>
				<div className='flex gap-3 float-left justify-start w-full'>
					<div className='flex flex-col gap-1 items-start justify-center'>
						<h4 className='text-small font-semibold leading-none text-secondary'>
							{title}
						</h4>
						<p className='text-small tracking-tight text-default-600'>
							{formatDateTime(date)}
						</p>
					</div>
				</div>
				<div className='float-right justify-self-end '>
					<div className='flex flex-row gap-x-2'>
						<Button
							color='primary'
							variant='solid'
							aria-label='Accept invitation'
							onClick={onAccept}
							className='text-white'
						>
							<MdCheck size='20px' />
						</Button>
						<Button
							className='bg-zinc-200 text-zinc-700'
							variant='solid'
							aria-label='Reject invitation'
							onClick={onReject}
						>
							<MdClose size='20px' />
						</Button>
					</div>
					<p className='pt-2 text-xs tracking-tight font-normal text-default-500 text-right'>
						Invited by {owner}
					</p>
				</div>
			</CardBody>
		</Card>
	);
};

export default MeetingInviteCard;
