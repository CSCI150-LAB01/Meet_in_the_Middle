// types/types.ts

export interface User {
	_id: string;
	email: string;
	password: string;
	username: string;
	defaultLocationId: string;
	createdAt: string;
	updatedAt: string;
	__v: string;
}

export interface NoVUser {
	_id: string;
	email: string;
	password: string;
	username: string;
	defaultLocationId: string;
	createdAt: string;
	updatedAt: string;
}

export interface LocationResponse {
	message: string;
	defaultLocation: {
		_id: string;
		coordinates: [number, number];
		createdAt: string;
		updatedAt: string;
	} | null;
}

export interface FriendListResponse {
	message: string;
	friends: NoVUser[]; // Updated to match the new response structure
}

export interface UserListResponse {
	userList: NoVUser[];
}

export interface RequestResponse {
	message: string;
	status: number;
}

export interface MeetingResponse {
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

export interface Notification {
	_id: string;
	userId: string;
	message: string;
	createdAt: string;
}

export interface GetNotificationsResponse {
	message: string;
	notifications: Notification[];
}
export interface MeetingRequest {
	placeId: string;
	title: string;
	dateTime: string;
}

export interface UserListResponse {
	userList: NoVUser[];
}
export interface FriendRequestsResponse {
	message: string;
	userId: string;
	friendRequests: FriendRequest[]; // Updated to match the new response structure
}
export type FriendRequest = {
	_id: string;
	senderId: string;
	recipientId: string;
	message: string;
	createdAt: string;
	__v: number;
	senderUsername: string;
	recipientUsername: string;
	senderEmail: string;
	recipientEmail: string;
};

export interface AcceptFriendRequestResponse {
	message: string;
	relationA: FriendRelation;
	relationB: FriendRelation;
	notification: NotificationInfo;
}

export interface FriendRelation {
	userId: string;
	friendId: string;
	_id: string;
	createdAt: string;
}

export interface NotificationInfo {
	userId: string;
	message: string;
	_id: string;
	createdAt: string;
}

export interface Meeting {
	_id: string;
	creatorId: string;
	title: string;
	placeId: string;
	meetingDateTime: string;
	pending: string[];
	denied: string[];
	accepted: string[];
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export interface CreateMeeting {
	meetingDateTime: string;
	title: string;
	placeId: string;
}

export interface CreateMeetingResponse {
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

export interface PlaceResult {
	place_id: string;
}

export interface GetMeetingsResponse {
	meetings: Meeting[];
}

export interface MeetingInviteRequestBody {
	meetingId: string;
	userIds: string[];
}

export interface MeetingInviteResponse {
	message: string;
	meeting: {
		_id: string;
		creatorId: string;
		title: string;
		placeId: string;
		pending: string[];
		denied: string[];
		accepted: string[];
		createdAt: string;
		updatedAt: string;
		__v: number;
	};
}

export interface MeetingWithName {
	_id: string;
	creatorId: string;
	title: string;
	placeId: string;
	meetingDateTime: string;
	pending: string[];
	denied: string[];
	accepted: string[];
	createdAt: string;
	updatedAt: string;
	__v: number;
	creatorName: string;
}

export interface SuggestionRequest {
	types: string[];
	radius: number;
	coordinates: { latitude: number; longitude: number }[];
}

export type SuggestionResponse = {
	results: Array<{
		name: string;
		place_id: string;
		rating: number;
		types: string[];
		user_ratings_total: number;
		vicinity: string;
	}>;
};

export interface SendFriendRequestResponse {
	message: string;
	friendRequest: {
		senderId: string;
		recipientId: string;
		message: string;
		_id: string;
		createdAt: string;
		__v: number;
	};
	notification: {
		userId: string;
		message: string;
		_id: string;
		createdAt: string;
		__v: number;
	};
}
