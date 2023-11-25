import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
const mongoose = require("mongoose");

import {getData, getUserById} from "../../../utils";
import {isFriends} from "../utils";

import FriendRelation from "@/models/friend-relation";
import FriendRequest from "@/models/friend-request";
import Notification from "@/models/notification";

// Accept friend request
export async function POST(request: Request) {
    try {
        await dbConnect();
    } catch {
        return NextResponse.json({ message: "Error connecting to database", status: 500 })
    }

    // Get data from body
    const data = await getData(request)
    if (data instanceof NextResponse) {
        return data;
    }

    // get sender from data
    const senderId = data.senderId;
    const sender = await getUserById(senderId);
    if (sender instanceof NextResponse) {
        return sender;
    }

    // get user from url
    const userId = request.url.slice(request.url.lastIndexOf('/') + 1);
    const user = await getUserById(userId);
    if (user instanceof NextResponse) {
        return user;
    }

    // check if friend is self
    if (senderId === userId) {
        return NextResponse.json({ message: "Cannot make friends with self" }, { status: 400 })
    }

    // check if friend request exists
    console.log("senderId", senderId)
    console.log("userId", userId)
    if(await FriendRequest.findOne({senderId, recipientId : userId}) == null)
    {
        return NextResponse.json({ message: "Friend request does not exist, cannot add friend" }, { status: 400 })
    }

    // check if user and sender are friends
    if(await isFriends(userId, senderId))
        return NextResponse.json({ message: "Friend already exists" }, { status: 400 })
    
    // add friend relation
    const relationA = new FriendRelation({
        userId,
        friendId: senderId,
    }, '-__v');

    const relationB = new FriendRelation({
        userId: senderId,
        friendId: userId,
    }, '-__v');

    try {
        await relationA.save();
        await relationB.save();
    } catch {
        return NextResponse.json({ message: "Error saving friend relation" }, { status: 500 })
    }

    // delete friend request
    let friendRequest = await FriendRequest.findOne({ senderId: senderId, recipientId: userId})
    if (!friendRequest) {
        return NextResponse.json({ message: "Friend request not found", status: 404 })
    }

    try {
        await friendRequest.deleteOne()
    } catch {
        return NextResponse.json({ message: "Error deleting friend request", status: 500 })
    }

    // create notification
    let notification
    try {
        notification = new Notification({
            userId: senderId,
            message: `${user.username} accepted your friend request`
        }, '-__v');
        await notification.save();
    } catch (error) {
        return NextResponse.json({ message: "Error creating notification", error, status: 500 })
    }

    return NextResponse.json({ message: "created friends and sent notification", relationA, relationB, notification }, { status: 200 })
}



