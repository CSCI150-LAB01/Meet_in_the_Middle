'use client';
import mongoose, { Schema, models } from 'mongoose';
import { getDefaultLocationById } from '@/app/api/utils';
import {
	fetchDefaultLocation,
	getFormattedAddress,
	getUser,
} from '@/utils/apiCalls';
import { Button } from '@nextui-org/react';
import { signOut } from 'next-auth/react';
import { ReactElement, useEffect, useState } from 'react';
import Link from 'next/link';

export interface DrawerProps {
	closeDrawer: () => void;
}
const DrawerContents: React.FC<DrawerProps> = ({ closeDrawer }) => {
	const [username, setUsername] = useState('Back');
	const [address, setAddress] = useState('Loading..');
	const [userID, setUserID] = useState<string | null>(null);

	const handleLogout = () => {
		signOut({ redirect: true, callbackUrl: '/user/login' });
	};

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userData = await getUser();
				setUsername(userData.username);
				setUserID(userData._id);
				const location = await fetchDefaultLocation(userData._id);
				const { coordinates } = location.defaultLocation || {};
				if (coordinates && coordinates.length === 2) {
					const address = await getFormattedAddress(
						coordinates[1],
						coordinates[0],
					);
					setAddress(address);
				}
			} catch (error) {
				console.error('Error fetching user:', error);
				setAddress('There was a problem getting your default address');
			}
		};

		// Call the function
		fetchUser();
	}, []);

	return (
		<div className='bg-white rounded-lg p-5 flex gap-2 flex-col'>
			<h3 className='text-zinc-500 font-semibold self-end text-lg capitalize'>
				Welcome {username + ','}
			</h3>
			<div className='flex flex-col gap-2 items-center justify-center w-full'>
				{/* Fix this at some point to figure out what it's for? */}
				<p className='font-semibold text-zinc-500'>My Default Location</p>
				<p>{address ? address : ''}</p>
				<Button className='w-full' color='secondary' onClick={closeDrawer}>
					Update Location
				</Button>
			</div>

			<Link
				key='settings'
				href={`/dashboard/profile/${userID}`}
				onClick={closeDrawer}
			>
				<p key='dashboard' className='hover:cursor-pointer hover:underline'>
					Profile
				</p>
			</Link>

			<Link key='settings' href='/dashboard/friends' onClick={closeDrawer}>
				<p className='hover:cursor-pointer hover:underline'>Friend Requests</p>
			</Link>
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
};
export default DrawerContents;
