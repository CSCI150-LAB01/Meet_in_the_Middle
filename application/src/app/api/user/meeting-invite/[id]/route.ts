import { getNotificationsById, getUserById } from '@/app/api/utils';
import dbConnect from '@/lib/db';
import Meeting from '@/models/meeting';
import { NextResponse } from 'next/server';
import { validatePOSTRequest } from '../utils';
import Notifications from '@/models/notifications';

// Responds with user's friend list
export async function GET(request: Request) {
	try {
		await dbConnect();
	} catch {
		return NextResponse.json({
			message: 'Error connecting to database',
			status: 500,
		});
	}

	const userId = request.url.slice(request.url.lastIndexOf('/') + 1);
	// validate user exists
	const userResponse = await getUserById(userId);
	if (userResponse instanceof NextResponse) {
		return userResponse;
	}

	let meeting;
	try {
		meeting = await Meeting.find({ pending: { $in: [userId] } });
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 },
		);
	}
	return NextResponse.json({ meeting }, { status: 200 });
}

// Send a meeting invite to users
export async function POST(request: Request) {
	const data = await validatePOSTRequest(request);
	if (data instanceof NextResponse) {
		return data;
	}

	try {
		await dbConnect();
	} catch {
		return NextResponse.json({
			message: 'Error connecting to database',
			status: 500,
		});
	}

	const senderId = request.url.slice(request.url.lastIndexOf('/') + 1);
	const sender = await getUserById(senderId);
	if (sender instanceof NextResponse) {
		return sender;
	}

	let meeting;
	try {
		meeting = await Meeting.findById(data.meetingId);
		for (let userId of data.users) {
			let notification = await Notifications.find({ userId: userId });
			return NextResponse.json({ notification }, { status: 200 });

			// if (
			// 	// meeting.accepted.includes(user) ||
			// 	// meeting.pending.includes(user) ||
			// 	// meeting.denied.includes(user)
			//   false
			// ) {
			// 	console.log(
			// 		`Skipping user ${userId}, they have already been invited before!`,
			// 	);
			// 	continue;
			// }
			meeting.pending.push(userId);

			notification.inbox.push({ senderId, isRead: false, createdAt: Date.now(), type: "meeting" });

			notification.save();
		}
		meeting.save();
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 },
		);
	}
	return NextResponse.json(
		{ message: 'Successfully created meeting', meeting },
		{ status: 200 },
	);
}