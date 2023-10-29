import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import CardLoading from './loading';
import { Location } from '@/utils/types';

interface MapProps {
	height: string;
	width: string;
	options?: google.maps.MapOptions;
}

const Map: React.FC<MapProps> = ({ height, width, options }) => {
	const [currentLocation, setCurrentLocation] = useState<Location>({
		lat: 0,
		lng: 0,
	});
	const [markers, setMarkers] = useState<Location[]>([]);

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API as string,
	});

	const [map, setMap] = useState(null);

	const onLoad = useCallback(function callback(map) {
		setMap(map);
	}, []);

	const onUnmount = useCallback(function callback(map) {
		setMap(null);
	}, []);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude: lat, longitude: lng } }) => {
				setMarkers([{ lat, lng }]);
				setCurrentLocation({ lat, lng });
			},
		);
	}, []);

	return isLoaded ? (
		<div className='flex rounded-lg overflow-clip w-full'>
			<GoogleMap
				center={currentLocation}
				zoom={15}
				onLoad={onLoad}
				options={{ ...options }}
				onUnmount={onUnmount}
				mapContainerStyle={{ height, width }}
			>
				{markers.map((mark, index) => (
					<Marker key={index} position={mark} />
				))}
			</GoogleMap>
		</div>
	) : (
		<CardLoading />
	);
};

export default Map;
