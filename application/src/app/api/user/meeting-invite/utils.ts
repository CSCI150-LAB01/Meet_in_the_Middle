import { NextResponse } from "next/server";
import { getUserById, getData } from '@/app/api/utils';

export async function validatePOSTRequest(request: any) {
	const data = await getData(request);

	if (data instanceof NextResponse) {
		return data;
	}

	if (!data.meetingId) {
		return NextResponse.json(
			{ message: 'Missing required field meetingId' },
			{ status: 400 },
		);
	}
	if (!data.userIds) {
		return NextResponse.json(
			{ message: 'Missing required field users' },
			{ status: 400 },
		);
	}
	if (!Array.isArray(data.userIds)) {
		return NextResponse.json(
			{ message: 'Field users must be of type array' },
			{ status: 400 },
		);
	}
	return data;
}

export async function validateSender(request: any, meeting: any) {
	const senderId = request.url.slice(request.url.lastIndexOf('/') + 1);
	
	// validate sender exists
	const sender = await getUserById(senderId);
	if (sender instanceof NextResponse) {
		return sender;
	}
	
	// validate sender has permission to invite users to meeting
	if (senderId != meeting.creatorId) {
		return NextResponse.json(
			{ message: 'You are not the creator of this meeting' },
			{ status: 401 },
		);
	}
	return senderId;
}