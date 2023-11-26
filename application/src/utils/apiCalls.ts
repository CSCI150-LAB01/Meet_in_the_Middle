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
		useStorage().setItem('user', JSON.stringify(responseBody), 'local');

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

export async function fetchFriendsList(userId: string) {
	try {
		interface friendListResponse {
			message: string;
			friendIds: string[]; // Replace 'string' with the actual type of friendIds if it's not a string array
		}

		const response = await fetch(`/api/user/friend-list/${userId}`);
		const data: friendListResponse = await response.json();

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
			const userString = useStorage().getItem('user', 'local');
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

export interface noVUser {
	_id: string;
	email: string;
	password: string;
	username: string;
	defaultLocationId: string;
	createdAt: string;
	updatedAt: string;
}
export async function searchFriends(keyword: string): Promise<noVUser[]> {
	try {
		interface UserListResponse {
			userList: noVUser[];
		}

		const response = await fetch(`/api/user-list`);
		const data: UserListResponse = await response.json();

		// Filter the userList based on the keyword
		const filteredUsers = data.userList.filter(user =>
			user.email.toLowerCase().includes(keyword.toLowerCase()),
		);

		return filteredUsers;
	} catch (error) {
		console.error('Error fetching user list:', error);
		// If an error occurs, return an empty array as a fallback
		return [];
	}
}

export async function sendFriendRequest(
	userId: string,
	message: string,
	recipientId: string,
) {
	const url = `/api/user/send-friend-request/${userId}`;

	const requestBody = {
		recipientId: recipientId,
		message: message,
	};

	interface requestResponse {
		message: string;
		status: number; // Replace 'string' with the actual type of friendIds if it's not a string array
	}

	const requestOptions: RequestInit = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(requestBody),
	};

	try {
		const response = await fetch(url, requestOptions);
		const responseData: requestResponse = await response.json();

		if (responseData.status === 200) {
			return;
		} else {
			console.error('Error sending friend request:', responseData.message);
			return responseData.message;
		}
	} catch (error) {
		console.error('Error sending friend request');
		return 'Error sending friend request';
	}
}

export async function getUserInfo(userId: string): Promise<noVUser> {
	const url = `/api/user/${userId}`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			console.error('Error:', response.status);

			if (response.status === 500) {
				throw new Error('Internal Server Error');
			}
		}

		const data = await response.json();
		const user = data.user;

		console.log('User Info:', user);
		return user;
	} catch (error) {
		throw error;
	}
}

interface MeetingRequest {
	placeId: string;
	title: string;
	dateTime: string;
}

interface MeetingResponse {
	meeting: {
		creatorId: string;
		title: string;
		placeId: string;
		pending: string[];
		denied: string[];
		accepted: string[];
		_id: string;
		createdAt: string;
		updatedAt: string;
		__v: number;
	};
}

async function createMeeting(
	userId: string,
	meetingData: MeetingRequest,
): Promise<MeetingResponse> {
	const url = `/api/user/meeting/${userId}`;

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(meetingData),
	});

	if (!response.ok) {
		// Handle error if needed
		throw new Error(
			`Failed to create meeting: ${response.status} - ${response.statusText}`,
		);
	}

	const result: MeetingResponse = await response.json();
	return result;
}

// Example usage:
const userId = 'yourUserId';
const meetingData: MeetingRequest = {
	placeId: 'xChIJc_F6SZDglIARiwcdwXAqF1A',
	title: 'Really Great Meeting',
	dateTime: '2012-04-23T18:25:43.511Z',
};
