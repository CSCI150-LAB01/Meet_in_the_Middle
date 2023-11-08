import { fromLatLng, setKey } from 'react-geocode';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Location } from '@/lib/types';
import useGeolocation from './useGeolocation';
import {
	useJsApiLoader,
} from '@react-google-maps/api';

export default function useGoogleMaps() {
  const { position, status } = useGeolocation();
	const [markers, setMarkers] = useState<Location[]>([]);
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const [placeholderText, setPlaceholderText] = useState<string>(
		'Enter your location',
	);
  const searchBox = useRef<google.maps.places.SearchBox | null>(null);

  // Map Loader
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API as string,
		libraries: ['places'],
	});

	// Map Functions
	const onLoad = useCallback(function callback(map: google.maps.Map) {
		setMap(map);
	}, []);

	const onUnmount = useCallback(function callback(map: google.maps.Map) {
		setMap(null);
	}, []);

	const onSBLoad = (ref: google.maps.places.SearchBox) => {
		searchBox.current = ref;
	};

	const onPlacesChanged = () => {
		const results = searchBox.current?.getPlaces() || [];
		const newMarkers =
			results.map(
				result => result.geometry?.location?.toJSON() ?? { lat: 0, lng: 0 },
			) ?? [];
		if (newMarkers.length && newMarkers && newMarkers[0]) {
			setMarkers(newMarkers);
		}
	};

	// Use the Geolocation API to get the current position of the device
	useEffect(() => {
		setKey(process.env.NEXT_PUBLIC_MAPS_API as string);
    if (position && status === 'granted') {
      setMarkers([{ lat: position.latitude, lng: position.longitude}]);
      fromLatLng(position.latitude, position.longitude).then(({ results }) => {
        setPlaceholderText(results[0].formatted_address);
      }).catch(err => console.log(err));
    }
	}, [position, status]);

	return {
    isLoaded,
    searchBox,
		markers,
		setMarkers,
		map,
		setMap,
		placeholderText,
		setPlaceholderText,
		onLoad,
		onUnmount,
		onSBLoad,
		onPlacesChanged,
	};
}
