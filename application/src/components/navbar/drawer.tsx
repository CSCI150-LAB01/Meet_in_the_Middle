'use client';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import useStorage from '@/hooks/useStorage';
import { getUser } from '@/utils/apiCalls';
import { Button } from '@nextui-org/react';
import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function DrawerContents() {
	var address = useCurrentLocation().placeholderText;
	const [username, setUsername] = useState('Back');

	const handleLogout = () => {
		useStorage().removeItem('user');
		signOut({ redirect: true, callbackUrl: '/user/login' });
	};

	useEffect(() => {
		const fetchUser = async () => {
			const userData = await getUser();
			setUsername(userData.username);
		};
		fetchUser();
	}, []);

	return (
		<div className='bg-white rounded-lg p-5 flex gap-2 flex-col'>
			<h3 className='text-zinc-500 font-semibold self-end text-lg capitalize'>
				Welcome {username + ','}
			</h3>
			<div className='flex flex-col gap-2 items-center justify-center w-full'>
				<p className='font-semibold text-zinc-500'>My Location</p>
				<p>
					{address.includes('Enter your location')
						? 'Loading location...'
						: address}
				</p>
				<Button className='w-full' color='secondary'>
					Update Location
				</Button>
			</div>

			<p key='dashboard' className='hover:cursor-pointer hover:underline'>
				Profile
			</p>
			<p key='settings' className='hover:cursor-pointer hover:underline'>
				Friend Requests
			</p>
			<p
				key='logout'
				className='text-danger hover:cursor-pointer hover:underline'
				color='danger'
				onClick={handleLogout}
			>
				Logout
			</p>
		</div>
	);
}
