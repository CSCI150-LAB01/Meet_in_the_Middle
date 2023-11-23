import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import User from '@/models/user';
import FriendList from "@/models/friend-list";
const mongoose = require("mongoose");
import * as utils from "../../../utils"
import * as meetingUtils from "./utils"

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


export async function POST(request: Request) {
    try {
        await dbConnect();
    } catch {
        return NextResponse.json({ message: "Error connecting to database", status: 500 })
    }

    const data = await utils.getData(request);
    if (data instanceof NextResponse) {
        return data;
    }

    const userId = request.url.slice(request.url.lastIndexOf('/') + 1);
    const user = await utils.getUserById(userId);
    if (user instanceof NextResponse) {
        return user;
    }

    const meeting = await meetingUtils.createMeeting(userId, data);
    if (meeting instanceof NextResponse) {
        return meeting;
    }

    return NextResponse.json({ meeting }, { status: 200 });
}



