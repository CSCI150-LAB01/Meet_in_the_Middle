'use client';
import { fromLatLng, setKey } from 'react-geocode';
import { MutableRefObject, useCallback, useEffect, useState } from 'react';
import { Location } from '@/lib/types';
import { useLocationContext } from './useLocationContext';

export function useCurrentLocation(searchBox: MutableRefObject<google.maps.places.SearchBox | null>) {
  const { setLocation, setType } = useLocationContext();
  const [currentLocation, setCurrentLocation] = useState<Location>({
		lat: 0,
		lng: 0,
	});
  const [markers, setMarkers] = useState<Location[]>([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [placeholderText, setPlaceholderText] = useState<string>(
		'Enter your location',
	);

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
		const newMarkers = results.map(result => result.geometry?.location?.toJSON() ?? { lat: 0, lng: 0 }) ?? [];
    if (newMarkers.length && newMarkers && newMarkers[0]) {
      setCurrentLocation(newMarkers[0]);
      setMarkers(newMarkers);
    }
	};

  // Use the Geolocation API to get the current position of the device
  useEffect(() => {
    setKey(process.env.NEXT_PUBLIC_MAPS_API as string);

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        setCurrentLocation({ lat, lng });
        setMarkers([{ lat, lng }]);
        fromLatLng(lat, lng)
          .then(({ results }) => {
            setPlaceholderText(results[0].formatted_address);
          })
          .catch(err => console.log(err));
      },
    );
  }, []);

  return  {
    currentLocation,
    setCurrentLocation,
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
  }

}
