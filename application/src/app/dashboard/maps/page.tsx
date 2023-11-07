'use client';
import Map from '@/components/map';
import { Button } from '@nextui-org/react';

export default function Maps() {
	return (
		<>
			<div className='absolute top-[0] left-[0] z-[0]'>
				<Map
					height='100vh'
					width='100vw'
					options={{ disableDefaultUI: true, gestureHandling: 'greedy' }}
				/>
			</div>

			<Button
				variant='solid'
				color='primary'
				className='self-start fixed bottom-[10px] left-[10px] '
			>
				View Location Suggestions
			</Button>
		</>
	);
}
