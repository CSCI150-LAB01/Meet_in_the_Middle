import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import User from '@/models/user';
import DefaultLocation from "@/models/default-location";
import FriendList from "@/models/friend-list";
import FriendRequest from "@/models/friend-requests";
import Meeting from "@/models/meeting";
import { get } from "http";
import { PLACE_TYPES } from "./constants";
import Notification from "@/models/notification";

const mongoose = require("mongoose");

export async function getData(request: Request) {
    try {
        const res = await request.json();
        return res;
    } catch (error: any) {
        console.log(error.stack)
        return NextResponse.json({ message: "Internal Error, request.json()" }, { status: 500 });
    }
}

export async function getUserById(userId: string) {
    let user;
    try {
        user = await User.findById(userId)
    } catch (error: any) {
        if (error instanceof mongoose.Error.CastError) {
            console.log("User Not Found")
            return NextResponse.json({ message: "User Not Found", error }, { status: 404 });
        }
        console.log(error.stack)
        return NextResponse.json({ message: "Error retrieving user by Id" }, { status: 500 });
    }
    if (!user) {
        return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }
    return user;
}

export async function getFriendListById(friendListId: string) {
    let friendList;
    try {
        friendList = await FriendList.findById(friendListId);
    } catch (error: any) {
        if (error instanceof mongoose.Error.CastError) {
            console.log("Friend List Not Found")
            return NextResponse.json({ message: "Friend List Not Found", error }, { status: 404 });
        }
        console.log(error.stack)
        return NextResponse.json({ message: "Error retrieving friend list by Id" }, { status: 500 });
    }
    if (!friendList) {
        return NextResponse.json({ message: "Friend List Not Found" }, { status: 404 });
    }
    return friendList;
}

export async function getFriendRequestById(friendRequestId: string) {
    let friendRequest;
    try {
        friendRequest = await FriendRequest.findById(friendRequestId);
    } catch (error: any) {
        if (error instanceof mongoose.Error.CastError) {
            console.log("Friend Request Not Found")
            return NextResponse.json({ message: "Friend Request Not Found", error }, { status: 404 });
        }
        console.log(error.stack)
        return NextResponse.json({ message: "Error retrieving friend Request by Id" }, { status: 500 });
    }
    if (!friendRequest) {
        return NextResponse.json({ message: "Friend Request Not Found" }, { status: 404 });
    }
    return friendRequest;
}

export async function getDefaultLocationById(defaultLocationId: string) {
    let defaultLocation;
    try {
        defaultLocation = await DefaultLocation.findById(defaultLocationId);
    } catch (error: any) {
        if (error instanceof mongoose.Error.CastError) {
            console.log("Default Location Not Found")
            return NextResponse.json({ message: "Default Location Not Found", error }, { status: 404 });
        }
        console.log(error.stack)
        return NextResponse.json({ message: "Error retrieving default location by Id" }, { status: 500 });
    }
    if (!defaultLocation) {
        return NextResponse.json({ message: "Default Location Not Found" }, { status: 404 });
    }
    return defaultLocation;
}

export async function getMeetingById(meetingId: string) {
    let meeting;
    try {
        meeting = await Meeting.findById(meetingId);
    } catch (error: any) {
        if (error instanceof mongoose.Error.CastError) {
            console.log("Meetings Not Found")
            return NextResponse.json({ message: "Meetings Not Found", error }, { status: 404 });
        }
        console.log(error.stack)
        return NextResponse.json({ message: "Error retrieving Meetings by Id" }, { status: 500 });
    }
    if (!meeting) {
        return NextResponse.json({ message: "Meetings Not Found" }, { status: 404 });
    }

    return meeting;
}

