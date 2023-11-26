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

export default function Notification() {
	return (
		<div className='flex w-full justify-center'>
			<div className='flex min-h-screen flex-col items-center lg:px-24 py-24 w-full max-w-[1080px] p-3'>
				<h1
					className={berlin.className + ' text-4xl sm:text-5xl text-zinc-700'}
				>
					Notifications
				</h1>
				<div className='container p-3 grid grid-cols-2 gap-3'>
					<p>You have no notifications</p>
				</div>
			</div>
		</div>
	);
}
