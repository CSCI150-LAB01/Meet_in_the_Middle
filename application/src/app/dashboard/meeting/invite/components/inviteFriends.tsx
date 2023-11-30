import React from 'react';
import { Card, CardBody, Avatar, Button } from '@nextui-org/react';
import { MdOutgoingMail } from 'react-icons/md';

interface FriendCardProps {
	name: string;
	email: string;
	invite?: boolean;
	onInvite?: () => void;
}

const FriendCard: React.FC<FriendCardProps> = ({
	name,
	email,
	invite = false,
	onInvite,
}) => {
	return (
		<Card className='min-h-[100px] w-full'>
			<CardBody className='w-full flex flex-row items-center gap-2'>
				<div className='flex gap-3 float-left justify-start w-full'>
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
				{invite && (
					<Button
						isIconOnly
						color='secondary'
						variant='solid'
						aria-label='Invite friend'
						className='float-right justify-self-end'
						onClick={onInvite}
					>
						<MdOutgoingMail size='25px' />
					</Button>
				)}
			</CardBody>
		</Card>
	);
};

export default FriendCard;
