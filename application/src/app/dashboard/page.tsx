'use client';
import CardLoading from '@/components/loading';
import Map from '@/components/map';
import { Card, Skeleton, Button } from '@nextui-org/react';

export default function Dashboard() {
	const isLoaded = false;
	return (
		<>
			<p>Location Data</p>
			<div className='flex flex-col gap-3 w-full p-3'>
				<Map />
			</div>
			<p>Upcoming Events</p>
			<div className='flex flex-col gap-3 w-full p-3'>
				<CardLoading />
			</div>
			<p>Friends</p>
			<div className='flex flex-col gap-3 w-full p-3'>
				<CardLoading />
			</div>
		</>
	);
}
