import useStorage from '@/hooks/useStorage';
import { User } from '@/types/types';
import { StringChain } from 'cypress/types/lodash';
import { fromLatLng, setKey } from 'react-geocode';
export async function createUser(
	email: string,
	password: string,
	username: string,
	coordinates: [number, number] = [0, 0],
): Promise<any> {
	// Validate coordinates range
	const [longitude, latitude] = coordinates;
	if (longitude < -180 || longitude > 180 || latitude < -90 || latitude > 90) {
		throw new Error('Invalid coordinates range');
	}

	const requestBody = {
		email,
		password,
		username,
		coordinates,
	};

	const apiUrl = '/api/signup/';

	try {
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		});

		if (!response.ok) {
			throw new Error(
				`Failed to create user: ${response.status} - ${response.statusText}`,
			);
		}

		return await response.json();
	} catch (error) {
		throw error;
	}
}

export async function UpdateUser(
	email: string,
	password: string,
): Promise<any> {
	const apiUrl = '/api/signin';

	const requestBody = {
		email,
		password,
	};

	try {
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		});

		if (!response.ok) {
			throw new Error(
				`Failed to get user: ${response.status} - ${response.statusText}`,
			);
		}

		const responseBody = await response.json();
		useStorage().setItem('user', JSON.stringify(responseBody));

		return await responseBody;
	} catch (error) {
		throw error;
	}
}

// Function to get formatted address
export async function getFormattedAddress(
	lat: number,
	lng: number,
): Promise<string> {
	const apiKey = process.env.NEXT_PUBLIC_MAPS_API;
	if (apiKey !== undefined) {
		setKey(apiKey);
	} else {
		throw new Error(
			'API key is undefined. Please check your environment variables.',
		);
	}
	try {
		const response = await fromLatLng(lat, lng);
		const formattedAddress = response?.results[0]?.formatted_address;

		if (formattedAddress) {
			return formattedAddress;
		} else {
			throw new Error('Unable to fetch formatted address');
		}
	} catch (error) {
		console.error('Error getting formatted address:', error);
		throw new Error('Unable to fetch formatted address');
	}
}

export async function fetchDefaultLocation(userId: string) {
	try {
		interface locationResponse {
			message: string;
			defaultLocation: {
				_id: string;
				coordinates: [number, number];
				createdAt: string;
				updatedAt: string;
			} | null;
		}

		const response = await fetch(`/api/user/default-location/${userId}`);
		const data: locationResponse = await response.json();

		if (response.ok) {
			return data;
		} else {
			console.error('Error in fetchData:', data);
			throw new Error('Internal server error');
		}
	} catch (error) {
		console.error('Error in fetchData:', error);
		throw new Error('Network error');
	}
}

export function getUser(): Promise<User> {
	return new Promise<User>(resolve => {
		try {
			const userString = useStorage().getItem('user');
			const parsedUser: Partial<User> = JSON.parse(userString || '{}');

			const fallbacks: User = {
				_id: 'noId',
				email: 'noEmail',
				password: 'noPassword',
				username: 'noUsername',
				defaultLocationId: 'noDefaultLocationId',
				friendListId: 'noFriendListId',
				friendRequestsId: 'noFriendRequestsId',
				notificationsId: 'noNotificationsId',
				meetingsId: 'noMeetingsId',
				createdAt: 'noCreatedAt',
				updatedAt: 'noUpdatedAt',
				__v: 'noV',
			};

			const mergedUser = { ...fallbacks, ...parsedUser };
			resolve(mergedUser as User);
		} catch (error) {
			console.error('Error parsing user data:', error);
			// Handle the error or reject the promise if needed
			resolve(getDefaultUser());
		}
	});
}
function getDefaultUser(): User {
	return {
		_id: 'noId',
		email: 'noEmail',
		password: 'noPassword',
		username: 'noUsername',
		defaultLocationId: 'noDefaultLocationId',
		friendListId: 'noFriendListId',
		friendRequestsId: 'noFriendRequestsId',
		notificationsId: 'noNotificationsId',
		meetingsId: 'noMeetingsId',
		createdAt: 'noCreatedAt',
		updatedAt: 'noUpdatedAt',
		__v: 'noV',
	};
}
