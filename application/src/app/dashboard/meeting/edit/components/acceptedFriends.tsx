import React from 'react';
import { Avatar } from '@nextui-org/react';

interface AcceptedFriendProps {
	name: string;
	email: string;
}

const AcceptedFriend: React.FC<AcceptedFriendProps> = ({ name, email }) => {
	return (
		<>
			<div className='w-full flex flex-col gap-2'>
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
			</div>
		</>
	);
};

export default AcceptedFriend;
