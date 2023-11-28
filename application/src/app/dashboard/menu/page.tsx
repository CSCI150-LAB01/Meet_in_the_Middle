'use client';
import { berlin } from '@/styles/fonts';
import DashboardCard from '../components/DashboardCard';
import {
	MdCalendarMonth,
	MdHome,
	MdMap,
	MdNotifications,
	MdPerson,
	MdPersonAdd,
} from 'react-icons/md';

export default function Menu() {
	return (
		<div className='flex w-full justify-center'>
			<div className='flex min-h-screen flex-col items-center lg:px-24 py-24 w-full max-w-[1080px] p-3'>
				<h1
					className={berlin.className + ' text-4xl sm:text-6xl text-zinc-700'}
				>
					Menu
				</h1>
				<div className='container p-3 grid grid-cols-2 gap-3'>
					<DashboardCard
						title='Home'
						backgroundColor='bg-primary'
						textColor='berlin'
						link='/dashboard'
						icon={<MdHome />}
					/>
					<DashboardCard
						title='Friends'
						backgroundColor='bg-primary'
						textColor='berlin'
						link='/dashboard/friends'
						icon={<MdPerson />}
					/>
					<DashboardCard
						title='Meetings'
						backgroundColor='bg-primary'
						textColor='berlin'
						link='/dashboard/meetings'
						icon={<MdCalendarMonth />}
					/>
					<DashboardCard
						title='Map'
						backgroundColor='bg-primary'
						textColor='berlin'
						link='/dashboard/maps'
						icon={<MdMap />}
					/>
					<DashboardCard
						title='Notifications'
						backgroundColor='bg-primary'
						textColor='berlin'
						icon={<MdNotifications />}
					/>
				</div>
			</div>
		</div>
	);
}
