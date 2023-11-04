import { LocationContext } from '@/contexts/LocationContext';
import { useContext } from 'react';

export function useLocationContext() {
	const context = useContext(LocationContext);
	if (!context) {
		throw new Error(
			'useLocationContext must be used within a LocationContextProvider',
		);
	}

	return context;
}
