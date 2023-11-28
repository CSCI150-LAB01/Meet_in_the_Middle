// types/types.ts

export interface User {
	_id: string;
	email: string;
	password: string;
	username: string;
	defaultLocationId: string;
	friendListId: string;
	friendRequestsId: string;
	notificationsId: string;
	meetingsId: string;
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
}

export interface MeetingResponse {
	meeting: Meeting;
}
