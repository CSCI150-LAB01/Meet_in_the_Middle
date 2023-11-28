import Meeting from '@/models/meeting';
import { NextResponse } from 'next/server';

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