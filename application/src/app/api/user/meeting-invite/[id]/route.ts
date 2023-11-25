import { getUserById } from '@/app/api/utils';
import dbConnect from '@/lib/db';
import Meeting from '@/models/meeting';
import { NextResponse } from 'next/server';
import { validatePOSTRequest, validateSender } from '../utils';
import Notification from '@/models/notification';

// Get all meeting invites for a user
export async function GET(request: Request) {
	try {
		await dbConnect();
	} catch {
		return NextResponse.json({
			message: 'Error connecting to database',
			status: 500,
		});
	}

	// validate user exists
	const userId = request.url.slice(request.url.lastIndexOf('/') + 1);
	const user = await getUserById(userId);
	if (user instanceof NextResponse) {
		return user;
	}

	// get all meeting invites for user
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
	return NextResponse.json({ meetings: meeting }, { status: 200 });
}


// Send a meeting invite to one or more users
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

	let meeting;
	try {
		meeting = await Meeting.findById(data.meetingId);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ message: 'Error finding meeting' },
			{ status: 500 },
		);
	}

	const sender = await validateSender(request, meeting);
	if (sender instanceof NextResponse) {
		return sender;
	}

	// invite users to meeting
	for (let userId of data.userIds) {
		// check if user has already been invited
		if (
			meeting.accepted.includes(userId) ||
			meeting.pending.includes(userId) ||
			meeting.denied.includes(userId)
		) {
			console.log(
				`Skipping user ${userId}, they have already been invited before!`,
			);
			continue;
		}
		meeting.pending.push(userId);

		// notify user of meeting invite
		try {
			const notification = new Notification({
				userId, 
				message: `${sender.username} invited you to a meeting!`,
				createdAt: new Date()
			})
			await notification.save();
		} catch (error) {
			console.log(error);
			return NextResponse.json(
				{ message: 'Error saving notification' },
				{ status: 500 },
			);
		}
	}
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
	return NextResponse.json(
		{ message: 'Successfully invited users to meeting', meeting },
		{ status: 200 },
	);
}