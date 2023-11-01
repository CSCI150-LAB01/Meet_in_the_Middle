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
		<>
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
		</>
	);
}
