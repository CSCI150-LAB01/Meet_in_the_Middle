import useStorage from '@/hooks/useStorage';
import {
	User,
	MeetingRequest,
	Notification,
	GetNotificationsResponse,
	NoVUser,
	UserListResponse,
	MeetingResponse,
	FriendRequestsResponse,
	AcceptFriendRequestResponse,
	PlaceResult,
	Meeting,
	CreateMeetingResponse,
	GetMeetingsResponse,
	MeetingInviteRequestBody,
	MeetingInviteResponse,
	MeetingWithName,
} from '@/types/types';
import { fromLatLng, setKey } from 'react-geocode';

interface ApiResponse<T> {
	message: string;
	data: T;
}

const apiUrl = '/api/';

async function handleApiResponse<T>(response: Response): Promise<T> {
	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(
			`Request failed with status ${response.status}. ${errorMessage}`,
		);
	}

	const data = await response.json();
	return data;
}

export async function createUser(
	email: string,
	password: string,
	username: string,
	coordinates: [number, number] = [0, 0],
): Promise<User> {
	const [longitude, latitude] = coordinates;

	if (longitude < -180 || longitude > 180 || latitude < -90 || latitude > 90) {
		throw new Error('Invalid coordinates range');
	}

	const requestBody = { email, password, username, coordinates };
	const response = await fetch(apiUrl + 'signup/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(requestBody),
	});

	return handleApiResponse<User>(response);
}

export async function UpdateUser(
	email: string,
	password: string,
): Promise<User> {
	const requestBody = { email, password };
	const response = await fetch(apiUrl + 'signin', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(requestBody),
	});

	const responseBody = await handleApiResponse<User>(response);
	useStorage().setItem('user', JSON.stringify(responseBody), 'local');

	return responseBody;
}

export async function getFormattedAddress(
	lat: number,
	lng: number,
): Promise<string> {
	const apiKey = process.env.NEXT_PUBLIC_MAPS_API;

	if (!apiKey) {
		throw new Error(
			'API key is undefined. Please check your environment variables.',
		);
	}

	setKey(apiKey);

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

export async function fetchData<T>(
	url: string,
	requestOptions?: RequestInit,
): Promise<T> {
	const response = await fetch(apiUrl + url, requestOptions);
	return handleApiResponse<T>(response);
}

export async function fetchDefaultLocation(userId: string): Promise<{
	message: string;
	defaultLocation: {
		_id: string;
		coordinates: [number, number];
		createdAt: string;
		updatedAt: string;
	} | null;
}> {
	return fetchData(`user/default-location/${userId}`);
}

export async function fetchFriendsList(
	userId: string,
): Promise<{ message: string; friends: NoVUser[] }> {
	try {
		const friendListResponse = await fetchData<{
			message: string;
			friendIds: string[];
		}>(`user/friend-list/${userId}`);

		const friendIds = friendListResponse.friendIds;
		const friends: NoVUser[] = [];

		for (const friendId of friendIds) {
			const friendInfo = await getUserInfo(friendId);
			friends.push(friendInfo);
		}

		return { message: friendListResponse.message, friends };
	} catch (error) {
		console.error('Error fetching friend list:', error);
		throw error;
	}
}

function getDefaultUser(): User {
	return {
		_id: 'noId',
		email: 'noEmail',
		password: 'noPassword',
		username: 'noUsername',
		defaultLocationId: 'noDefaultLocationId',
		createdAt: 'noCreatedAt',
		updatedAt: 'noUpdatedAt',
		__v: 'noV',
	};
}

export async function searchFriends(keyword: string): Promise<NoVUser[]> {
	try {
		const response = await fetchData<UserListResponse>('/user-list');
		const filteredUsers = response.userList.filter(user =>
			user.email.toLowerCase().includes(keyword.toLowerCase()),
		);
		return filteredUsers;
	} catch (error) {
		console.error('Error fetching user list:', error);
		return [];
	}
}

export async function sendFriendRequest(
	userId: string,
	message: string,
	recipientId: string,
): Promise<string | undefined> {
	const url = `user/send-friend-request/${userId}`;
	const requestBody = { recipientId, message };

	const requestOptions: RequestInit = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(requestBody),
	};

	try {
		const response = await fetch(apiUrl + url, requestOptions);
		const responseData: ApiResponse<{ status: number }> = await response.json();

		if (responseData.data.status === 200) {
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

export async function getUserInfo(userId: string): Promise<NoVUser> {
	const url = `user/${userId}`;

	try {
		const response = await fetchData<{ user: NoVUser }>(url);
		return response.user;
	} catch (error) {
		throw error;
	}
}

export async function getNotifications(
	userId: string,
): Promise<GetNotificationsResponse> {
	const url = `user/notifications/${userId}`;

	try {
		return fetchData<GetNotificationsResponse>(url);
	} catch (error) {
		throw error;
	}
}

export async function deleteNotification(
	userId: string,
	notificationId: string,
): Promise<{ message: string }> {
	const url = `user/notifications/${userId}`;

	const requestOptions: RequestInit = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ notificationId }),
	};

	try {
		return await fetchData<{ message: string }>(url, requestOptions);
	} catch (error) {
		console.error('Error during fetch:', error);
		throw error;
	}
}
export async function getFriendRequests(
	userId: string,
): Promise<FriendRequestsResponse> {
	const url = `user/friend-requests/${userId}`;

	try {
		const friendRequestsResponse = await fetchData<{
			message: string;
			userId: string;
			friendRequests: {
				_id: string;
				senderId: string;
				recipientId: string;
				message: string;
				createdAt: string;
				__v: number;
			}[];
		}>(url);

		const friendRequests = friendRequestsResponse.friendRequests;

		const friendRequestsInfo: FriendRequestsResponse = {
			message: friendRequestsResponse.message,
			userId: friendRequestsResponse.userId,
			friendRequests: [],
		};

		for (const request of friendRequests) {
			const senderInfo = await getUserInfo(request.senderId);
			const recipientInfo = await getUserInfo(request.recipientId);

			const formattedRequest = {
				...request,
				senderUsername: senderInfo.username,
				recipientUsername: recipientInfo.username,
				senderEmail: senderInfo.email,
				recipientEmail: recipientInfo.email,
			};

			friendRequestsInfo.friendRequests.push(formattedRequest);
		}

		return friendRequestsInfo;
	} catch (error) {
		console.error('Error fetching friend requests:', error);
		throw error;
	}
}
export async function acceptFriendRequest(
	userId: string,
	senderId: string,
): Promise<AcceptFriendRequestResponse> {
	const url = `user/accept-friend-request/${userId}`;
	const requestBody = { senderId };

	const requestOptions: RequestInit = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(requestBody),
	};

	try {
		const response = await fetch(apiUrl + url, requestOptions);
		return handleApiResponse<AcceptFriendRequestResponse>(response);
	} catch (error) {
		console.error('Error accepting friend request:', error);
		throw error;
	}
}

export async function createMeeting(
	userId: string,
	placeId: string,
	title: string,
	meetingDateTime: string,
): Promise<MeetingResponse> {
	const url = `user/meeting/${userId}`;
	const requestOptions: RequestInit = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			placeId,
			title,
			meetingDateTime,
		}),
	};

	const response = await fetchData<CreateMeetingResponse>(url, requestOptions);
	return response;
}

export async function getClosestPlaceId(
	lat: number,
	lng: number,
): Promise<string> {
	const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1000&key=${process.env.NEXT_PUBLIC_MAPS_API}`;

	const isDev = process.env.NODE_ENV === 'development';

	let proxyUrl = '';
	if (isDev) {
		proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	}

	try {
		const url = `${proxyUrl}${apiUrl}`;

		const response = await fetch(url);

		const data = await response.json();

		if (data.status === 'OK' && data.results.length > 0) {
			const closestPlace = data.results[0];

			return closestPlace.place_id;
		} else {
			throw new Error('Error fetching data');
		}
	} catch (error) {
		throw error;
	}
}

export async function getUpcomingMeetings(userID: string): Promise<Meeting[]> {
	const endpoint = `user/meeting/${userID}`;
	try {
		const data: GetMeetingsResponse = await fetchData(endpoint);

		// Filter upcoming meetings
		const now = new Date();
		const upcomingMeetings = data.meetings
			.filter(meeting => {
				const meetingDateTime = new Date(meeting.meetingDateTime);
				return meetingDateTime > now;
			})
			.sort((a, b) => {
				const dateTimeA = new Date(a.meetingDateTime);
				const dateTimeB = new Date(b.meetingDateTime);
				return dateTimeA.getTime() - dateTimeB.getTime();
			});

		return upcomingMeetings;
	} catch (error) {
		console.error('Error fetching meetings:', error);
		throw error;
	}
}

export async function getMeetingById(
	userId: string,
	meetingId: string,
): Promise<any> {
	const endpoint = `user/meeting/${userId}`;

	try {
		const data = await fetchData<GetMeetingsResponse>(endpoint);
		const meetings = data.meetings;

		// Find the meeting with the specified ID
		const requestedMeeting = meetings.find(
			(meeting: Meeting) => meeting._id === meetingId,
		);

		if (!requestedMeeting) {
			throw new Error(`Meeting with ID ${meetingId} not found.`);
		}

		return requestedMeeting;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function sendMeetingInvite(
	userId: string,
	requestBody: MeetingInviteRequestBody,
): Promise<MeetingInviteResponse> {
	const url = `user/meeting-invite/${userId}`;
	const requestOptions: RequestInit = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(requestBody),
	};

	const response = await fetchData<MeetingInviteResponse>(url, requestOptions);
	return response;
}

export async function getMeetingInvites(
	userId: string,
): Promise<MeetingWithName[]> {
	const url = `user/meeting-invite/${userId}`;
	try {
		const data: GetMeetingsResponse = await fetchData(url);

		const meetingList: MeetingWithName[] = [];

		for (const meeting of data.meetings) {
			const creator = await getUserInfo(meeting.creatorId);

			const formattedRequest = {
				...meeting,
				creatorName: creator.username,
			};

			meetingList.push(formattedRequest);
		}

		return meetingList;
	} catch (error) {
		console.error('Error fetching meeting invites:', error);
		throw error;
	}
}

export async function getAllMeetings(userID: string): Promise<Meeting[]> {
	const endpoint = `user/meeting/${userID}`;

	const response = await fetchData<{ meetings: Meeting[] }>(endpoint);
	return response.meetings;
}
