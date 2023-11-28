import React, { useCallback, useEffect, useRef } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import CardLoading from './loading';
import useGoogleMaps from '@/hooks/useGoogleMaps';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';

interface MapProps {
	height: string;
	width: string;
	options?: google.maps.MapOptions;
}

const Map: React.FC<MapProps> = ({ height, width, options }) => {
	const {
		isLoaded,
		searchBox,
		markers,
		setMarkers,
		map,
		onLoad,
		onUnmount,
		onSBLoad,
		onPlacesChanged,
	} = useGoogleMaps();

	const {
		currentLocation,
		setCurrentLocation,
		placeholderText,
		setPlaceholderText,
	} = useCurrentLocation(searchBox);

	useEffect(() => {
		// Use the Geolocation API to get the current position of the device
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude: lat, longitude: lng } }) => {
				setMarkers([{ lat, lng }]);
				setCurrentLocation({ lat, lng });
			},
		);
	}, [setMarkers, setCurrentLocation]);

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
