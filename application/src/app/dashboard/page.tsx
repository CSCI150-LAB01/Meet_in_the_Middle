'use client';
import { berlin } from '@/styles/fonts';
import DashboardCard from './components/DashboardCard';
import {
	MdCalendarMonth,
	MdMap,
	MdNotifications,
	MdPerson,
	MdPersonAdd,
} from 'react-icons/md';

export default function Dashboard() {
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
						icon={<MdPersonAdd />}
					/>
					<DashboardCard
						title='Create Meeting'
						backgroundColor='bg-primary'
						textColor='berlin'
						link='/dashboard/meeting/create'
						icon={<MdCalendarMonth />}
					/>
					<DashboardCard
						title='Search Places'
						backgroundColor='bg-primary'
						textColor='berlin'
						link='/dashboard/maps'
						icon={<MdMap />}
					/>
					<DashboardCard
						title='View Notifications'
						backgroundColor='bg-primary'
						textColor='berlin'
						icon={<MdNotifications />}
					/>
				</div>
			</div>
		</div>
	);
}
