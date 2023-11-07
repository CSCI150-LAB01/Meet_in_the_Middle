'use client';
import CardLoading from '@/components/loading';
import Map from '@/components/map';
import { Card, Skeleton, Button } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Dashboard() {
	const { data } = useSession();
	const [response, setResponse] = useState(data);

	const isLoaded = false;
	return (
		<div className='flex w-full justify-center'>
			<div className='flex min-h-screen flex-col items-center lg:px-24 py-24 w-full max-w-[1080px]'>
				<p>{response ? JSON.stringify(response) : 'no resp'}</p>
				<p>Location Data</p>
				<div className='flex flex-col gap-3 w-full p-3'>
					<Map height='350px' width='900px' />
				</div>
				<p>Upcoming Events</p>
				<div className='flex flex-col gap-3 w-full p-3'>
					<CardLoading />
				</div>
				<p>Friends</p>
				<div className='flex flex-col gap-3 w-full p-3'>
					<CardLoading />
				</div>
			</div>
		</div>
	);
}
