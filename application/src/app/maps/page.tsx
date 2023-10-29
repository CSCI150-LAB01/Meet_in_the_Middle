'use client';
import Map from '@/components/map';

export default function Maps() {
	return (
		<>
			<div className='absolute'>
				<Map height='100vh' width='100vw' />
			</div>
		</>
	);
}
