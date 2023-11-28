import Meeting from '@/models/meeting';
import { NextResponse } from 'next/server';
import { getUserById } from '@/app/api/utils';


export async function getMeetings(userId: any) {

    let meetings;
    try {
    meetings = await Meeting.find({ accepted: { $in: [userId] } });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error getting meetings" }, { status: 400 });
    }

    return meetings;
}

export async function createMeeting(userId: any, data: any) {
    const { placeId, time, date } = data;

    let meeting;
    try {
        meeting = await Meeting.create({
            placeId: placeId,
            meetingDateTime: new Date(date + " " + time),
            creatorId: userId,
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error creating meeting" }, { status: 400 });
    }
    return meeting;
}

export async function getMeetingById(meetingId: any) {
    let meeting;
    try {
        meeting = await Meeting.findById(meetingId, '-__v');
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error getting meeting" }, { status: 400 });
    }
    return meeting;
}

export async function validateUser(request: any, meeting: any) {
	
	// validate sender has permission to invite users to meeting
	const userId = request.url.slice(request.url.lastIndexOf('/') + 1);
	if (userId != meeting.creatorId) {
		return NextResponse.json(
			{ message: 'You are not the creator of this meeting' },
			{ status: 401 },
		);
	}

	const user = await getUserById(userId);	
	return user;
}