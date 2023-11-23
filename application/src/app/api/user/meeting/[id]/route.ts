import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import User from '@/models/user';
import FriendList from "@/models/friend-list";
const mongoose = require("mongoose");
import * as utils from "../../../utils"
import * as meetingUtils from "./utils"
import Meeting from "@/models/meeting";

//!! TEST WITH MULTIPLE MEETINGS, also needs attendee meetings
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

    // return NextResponse.json({ message: "Not implemented" }, { status: 501 });

    const userId = request.url.slice(request.url.lastIndexOf('/') + 1);
    const user = await utils.getUserById(userId);
    if (user instanceof NextResponse) {
        return user
    }
    console.log("userId" + userId);

    const data = await utils.getData(request);
    if (data instanceof NextResponse) {
        return data;
    }

    if (!data.dateTime || !data.title || !data.placeId) {
        return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const dateTime = new Date(data.dateTime);
    if (dateTime.toString() === "Invalid Date") {
        return NextResponse.json({ message: "Invalid date and time" }, { status: 400 });
    }

    const title = data.title;
    if (title.length > 50) {
        return NextResponse.json({ message: "Title must be less than 50 characters" }, { status: 400 });
    }

    const placeId = data.placeId;
    const apiKey = process.env.GOOGLE_MITM_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;
    const location = await fetch(url)
        .then(response => { return response.json() })
        .catch(error => {
            console.error('Error:', error);
        });

    // if (!location.result.geometry) {
    //     return NextResponse.json({ message: "Invalid place" }, { status: 400 });
    // }

    const meeting = new Meeting({
        title: title,
        dateTime: dateTime,
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

// Create a meeting
export async function DELETE(request: Request) {
    try {
        await dbConnect();
    } catch {
        return NextResponse.json({ message: "Error connecting to database", status: 500 })
    }

    // return NextResponse.json({ message: "Not implemented" }, { status: 501 });

    const userId = request.url.slice(request.url.lastIndexOf('/') + 1);
    const user = await utils.getUserById(userId);
    if (user instanceof NextResponse) {
        return user
    }
    console.log("userId" + userId);

    const data = await utils.getData(request);
    if (data instanceof NextResponse) {
        return data;
    }

    if (!data.meetingId) {
        return NextResponse.json({ message: "Missing meetingId" }, { status: 400 });
    }

    try {
        await Meeting.deleteOne({ _id: data.meetingId });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error deleting meeting" }, { status: 400 });
    }

    return NextResponse.json({ message: `deleted ${data.meetingId}` }, { status: 200 });
}





