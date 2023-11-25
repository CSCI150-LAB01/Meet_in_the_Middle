import useStorage from '@/hooks/useStorage';
import { User } from '@/types/types';
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

export async function updateUser(
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
