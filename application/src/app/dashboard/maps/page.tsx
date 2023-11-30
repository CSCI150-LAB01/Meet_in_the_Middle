'use client';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { StandaloneSearchBox } from '@react-google-maps/api';
import useGoogleMaps from '@/hooks/useGoogleMaps';
import { Button, Input } from '@nextui-org/react';
import { MdOutlineSearch } from 'react-icons/md';
import { useState } from 'react';

export default function Maps() {
	const [loading, isLoading] = useState(false);

	const {
		isLoaded,
		searchBox,
		markers,
		map,
		placeholderText,
		onLoad,
		onUnmount,
		onSBLoad,
		onPlacesChanged,
	} = useGoogleMaps();

	return (
		<>
			<div className='flex flex-col items-center justify-center absolute w-full min-h-screen relative bg-transparent'>
				<div className='absolute top-[0] left-[0] z-[0]'>
					{isLoaded && (
						<div className='overflow-clip rounded-lg w-full'>
							<GoogleMap
								center={markers.length ? markers[0] : { lat: 0, lng: 0 }}
								zoom={15}
								onLoad={onLoad}
								onUnmount={onUnmount}
								mapContainerStyle={{ height: '100vh', width: '100vw' }}
								options={{ disableDefaultUI: true, gestureHandling: 'greedy' }}
							>
								{/* Display markers on the map */}
								{markers.map((mark, index) => (
									<Marker key={index} position={mark} />
								))}
							</GoogleMap>
						</div>
					)}
				</div>

				<div className='flex min-h-screen flex-col items-center pt-24 px-3 w-full max-w-[500px]'>
					<div className='flex items-start flex-col gap-2 flex-grow w-full w-full standalone-search-box-container'>
						{/* replace with the autocomplete box */}
						{isLoaded ? (
							<StandaloneSearchBox
								onLoad={onSBLoad}
								onPlacesChanged={onPlacesChanged}
							>
								<Input
									classNames={{
										base: 'sm:max-w-[500px] h-10',
										mainWrapper: 'flex-grow w-full', // Updated style
										input: 'text-small w-full',
										inputWrapper: 'h-full font-normal bg-default-300/80',
									}}
									placeholder={loading ? 'Loading...' : placeholderText}
									size='sm'
									startContent={<MdOutlineSearch />}
									type='search'
									color='default'
								/>
							</StandaloneSearchBox>
						) : (
							<Input
								classNames={{
									base: 'sm:max-w-[500px] h-10',
									mainWrapper: 'flex-grow w-full', // Updated style
									input: 'text-small',
									inputWrapper: 'h-full font-normal bg-default-300/80',
								}}
								placeholder='Please wait for the map to load.'
								size='sm'
								startContent={<MdOutlineSearch />}
								type='search'
								color='default'
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
