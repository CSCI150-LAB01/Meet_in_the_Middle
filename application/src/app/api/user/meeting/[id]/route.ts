import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import User from '@/models/user';
const mongoose = require("mongoose");
import * as utils from "../../../utils"
import * as meetingUtils from "../utils"
import { getMeetingById, validateUser } from "../utils";
import Meeting from "@/models/meeting";

// Return all meetings where the user is the creator or an attendee
export async function GET(request: Request) {
    try {
        await dbConnect();
    } catch {
        return NextResponse.json({ message: "Error connecting to database", status: 500 })
    }

    const userId = request.url.slice(request.url.lastIndexOf('/') + 1);
    const user = await utils.getUserById(userId);
    if (user instanceof NextResponse) {
        return user;
    }

    const meetings = await meetingUtils.getMeetings(userId);
    if (meetings instanceof NextResponse) {
        return meetings;
    }

    return NextResponse.json({ meetings }, { status: 200 });
}

// Create a meeting
export async function POST(request: Request) {
    try {
        await dbConnect();
    } catch {
        return NextResponse.json({ message: "Error connecting to database", status: 500 })
    }

    // get user Id
    const userId = request.url.slice(request.url.lastIndexOf('/') + 1);
    const user = await utils.getUserById(userId);
    if (user instanceof NextResponse) {
        return user
    }
    console.log("userId" + userId);

    // get data
    const data = await utils.getData(request);
    if (data instanceof NextResponse) {
        return data;
    }

    // check for missing data
    if (!data.meetingDateTime || !data.title || !data.placeId) {
        return NextResponse.json({ message: "Must include meetingDateTime, title, and placeId" }, { status: 400 });
    }

    // check if meeting date time is valid
    const meetingDateTime = data.meetingDateTime;
    if (meetingDateTime.toString() === "Invalid Date") {
        return NextResponse.json({ message: "Invalid date and time" }, { status: 400 });
    }
    if (new Date(meetingDateTime) < new Date()) {
        return NextResponse.json({ message: "Meeting date and time must be in the future" }, { status: 400 });
    }

    // check if title is valid
    const title = data.title;
    if (title.length > 50) {
        return NextResponse.json({ message: "Title must be less than 50 characters" }, { status: 400 });
    }

    // check if placeId is valid
    const placeId = data.placeId;
    const apiKey = process.env.GOOGLE_MITM_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;
    const location = await fetch(url)
        .then(response => { return response.json() })
        .catch(error => {
            console.error('Error:', error);
        });

    // create meeting and add user as accepted
    const meeting = new Meeting({
        title: title,
        meetingDateTime: meetingDateTime,
        placeId: placeId,
        creatorId: userId,
    });
    meeting.accepted.push(userId);

    try {
        await meeting.save();
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error creating meeting" }, { status: 400 });
    }

    return NextResponse.json({ meeting }, { status: 200 });
}

// Upddate a meeting
export async function PATCH(request: Request) {
    try {
        await dbConnect();
    } catch {
        return NextResponse.json({ message: "Error connecting to database", status: 500 })
    }

    // get data
    const data = await utils.getData(request);
    if (data instanceof NextResponse) {
        return data;
    }

    // check if meetingId is present in data
    if (!data.meetingId) {
        return NextResponse.json({ message: "Missing meetingId" }, { status: 400 });
    }

    // check if meeting exists and get meeting
    let meeting = await getMeetingById(data.meetingId);
    if (meeting instanceof NextResponse) {
        return meeting;
    }

    // validate user has permission to update meeting
    const user = validateUser(request, meeting);
    if (user instanceof NextResponse) {
        return user;
    }

    // check if at least one update field is present
    if (!data.meetingDateTime && !data.title && !data.placeId) {
        return NextResponse.json({ message: "Must send at least one of the following fields meetingDateTime, placeId, title" }, { status: 400 });
    }

    // if meetingDateTime is present in data
    if (data.meetingDateTime) {
        // check if meeting date time is valid
        const meetingDateTime = data.meetingDateTime;
        if (meetingDateTime.toString() === "Invalid Date") {
            return NextResponse.json({ message: "Invalid date and time" }, { status: 400 });
        }
        if (new Date(meetingDateTime) < new Date()) {
            return NextResponse.json({ message: "Meeting date and time must be in the future" }, { status: 400 });
        }
        meeting.meetingDateTime = meetingDateTime;
    }

    // if title is present in data
    if (data.title) {
        // check if title is valid
        const title = data.title;
        if (title.length > 50) {
            return NextResponse.json({ message: "Title must be less than 50 characters" }, { status: 400 });
        }
        meeting.title = title;
    }

    // if placeId is present in data
    if (data.placeId) {
        // check if placeId is valid
        const placeId = data.placeId;
        const apiKey = process.env.GOOGLE_MITM_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;
        const location = await fetch(url)
            .then(response => { return response.json() })
            .catch(error => {
                console.error('Error:', error);
            });
        meeting.placeId = placeId;
    }

    meeting.updatedAt = new Date();

    try {
        await meeting.save();
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error creating meeting" }, { status: 400 });
    }

    return NextResponse.json({ meeting }, { status: 200 });
}

// Delete a meeting
export async function DELETE(request: Request) {
    try {
        await dbConnect();
    } catch {
        return NextResponse.json({ message: "Error connecting to database", status: 500 })
    }

    // get user from url
    const userId = request.url.slice(request.url.lastIndexOf('/') + 1);
    const user = await utils.getUserById(userId);
    if (user instanceof NextResponse) {
        return user
    }

    // get data from body
    const data = await utils.getData(request);
    if (data instanceof NextResponse) {
        return data;
    }

    //get meetingId from data
    if (!data.meetingId) {
        return NextResponse.json({ message: "Missing meetingId" }, { status: 400 });
    }

    // delete meeting
    try {
        await Meeting.deleteOne({ _id: data.meetingId });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error deleting meeting" }, { status: 400 });
    }

    // delete

    return NextResponse.json({ message: `deleted meeting ${data.meetingId}` }, { status: 200 });
}





