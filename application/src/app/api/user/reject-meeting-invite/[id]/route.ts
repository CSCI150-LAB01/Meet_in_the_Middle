import { getUserById } from '@/app/api/utils';
import dbConnect from '@/lib/db';
import Meeting from '@/models/meeting';
import { NextResponse } from 'next/server';
import { validatePOSTRequest } from '../utils';
import Notification from '@/models/notification';

// Send a meeting invite to one or more users
export async function POST(request: Request) {

	try {
		await dbConnect();
	} catch {
		return NextResponse.json({
			message: 'Error connecting to database',
			status: 500,
		});
	}

	const data = await validatePOSTRequest(request);
	if (data instanceof NextResponse) {
		return data;
	}

	let meeting;
	try {
		meeting = await Meeting.findById(data.meetingId, '-__v');
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ message: 'Error finding meeting' },
			{ status: 500 },
		);
	}

	// get user from url
	const userId = request.url.slice(request.url.lastIndexOf('/') + 1);
	const user = await getUserById(userId);
	if (user instanceof NextResponse) {
		return user;
	}

	// has user been invited to meeting?
	if (!meeting.pending.includes(userId) && !meeting.accepted.includes(userId)) {
		return NextResponse.json({ message: 'User has not been invited to meeting' }, { status: 400 });
	}

	// accept meeting invite
	if (meeting.accepted.includes(userId)) {
		meeting.accepted.remove(userId);
	}
	if (meeting.pending.includes(userId)) {
		meeting.pending.remove(userId);
	}
	meeting.denied.push(userId);
	meeting.updatedAt = new Date();

	try {
		await meeting.save();
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ message: 'Error saving meeting' },
			{ status: 500 },
		);
	}

	// notify meeting creator that a user has accepted their meeting invite
	try {
		const notification = new Notification({
			userId: meeting.creatorId,
			message: `${user.username} accepted your meeting invite`,
			createdAt: new Date()
		}, '-__v');
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ message: 'Error saving notification' },
			{ status: 500 },
		);
	}

	return NextResponse.json(
		{ message: 'Successfully Rejected meeting invite', meeting },
		{ status: 200 },
	);
}