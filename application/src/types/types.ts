export interface User {
	_id: string | 'noId';
	email: string | 'noEmail';
	password: string | 'noPassword';
	username: string | 'noUsername';
	defaultLocationId: string | 'noDefaultLocationId';
	friendListId: string | 'noFriendListId';
	friendRequestsId: string | 'noFriendRequestsId';
	notificationsId: string | 'noNotificationsId';
	meetingsId: string | 'noMeetingsId';
	createdAt: string | 'noCreatedAt';
	updatedAt: string | 'noUpdatedAt';
	__v: number | 'noV';
}
