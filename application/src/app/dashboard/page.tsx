'use client';
import CardLoading from '@/components/loading';
import Map from '@/components/map';
import { Card, Skeleton, Button } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { berlin } from '@/styles/fonts';
import DashboardCard from './components/DashboardCard';

export default function Dashboard() {
	const { data } = useSession();

	const isLoaded = false;
	return (
		<div className='flex w-full justify-center'>
			<div className='flex min-h-screen flex-col items-center lg:px-24 py-24 w-full max-w-[1080px] p-3'>
				<h1
					className={berlin.className + ' text-4xl sm:text-6xl text-zinc-700'}
				>
					Welcome home!
				</h1>
				<div className='container p-3'>
					<h2 className=' text-xl text-zinc-500 font-bold'>
						Upcoming Meetings
					</h2>
					<p>You have no upcoming meetings</p>
				</div>
				<div className='container p-3 grid grid-cols-2 gap-3'>
					<DashboardCard
						title='Find Friends'
						backgroundColor='bg-primary'
						textColor='berlin'
						link='/dashboard/friends'
					/>
					<DashboardCard
						title='Create Meeting'
						backgroundColor='bg-primary'
						textColor='berlin'
						link='/dashboard/meeting/create'
					/>
					<DashboardCard
						title='Search Places'
						backgroundColor='bg-primary'
						textColor='berlin'
						link='/dashboard/maps'
					/>
					<DashboardCard
						title='View Notifications'
						backgroundColor='bg-primary'
						textColor='berlin'
					/>
				</div>
			</div>
		</div>
	);
}
