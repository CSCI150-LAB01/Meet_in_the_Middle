import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
const mongoose = require("mongoose");

import { getUserById, getData } from "../../../utils"

import FriendRequest from '@/models/friend-request';
import FriendRelation from "@/models/friend-relation";
import Notification from "@/models/notification";

// Send friend request from user to recipient
export async function POST(request: Request) {
    try {
        await dbConnect();
    } catch {
        return NextResponse.json({ message: "Error connecting to database", status: 500 })
    }

    // Get data from body and url
    const data = await getData(request)
    if (data instanceof NextResponse) {
        return data;
    }
    if (!data.recipientId) {
        return NextResponse.json({ message: "Missing recipientId", status: 400 })
    }
    if (!data.message) {
        return NextResponse.json({ message: "Missing message", status: 400 })
    }
    const recipientId = data.recipientId;
    const message = data.message;

    // Check if recipient exists
    const recipient = await getUserById(recipientId)
    if (recipient instanceof NextResponse) {
        return recipient;
    }

    // Get user
    const userId = request.url.slice(request.url.lastIndexOf('/') + 1);
    const user = await getUserById(userId)
    if (user instanceof NextResponse) {
        return user;
    }

    // Check if friend request already exists
    if (await FriendRequest.findOne({ senderId: userId, recipientId: recipientId })) {
        return NextResponse.json({ message: "Friend request already exists", status: 400 })
    }

    // Check if user is already friends with recipient
    if (await FriendRelation.findOne({ userId: userId, friendId: recipientId })) {
        return NextResponse.json({ message: "User is already friends with recipient", status: 400 })
    }

    // check if self
    if (userId === recipientId) {
        return NextResponse.json({ message: "Cannot send friend request to self", status: 400 })
    }

    // send friend request
    let friendRequest;
    try {
        friendRequest = new FriendRequest({
            senderId: userId,
            recipientId: recipientId,
            message: message,
        })
        await friendRequest.save()
    } catch (error) {
        return NextResponse.json({ message: "Error saving friend request", error, status: 500 })
    }

    // create notification
    let notification
    try {
        notification = new Notification({
            userId: recipientId,
            message: `${user.username} sent you a friend request`
        });
        await notification.save();
    } catch (error) {
        return NextResponse.json({ message: "Error creating notification", error, status: 500 })
    }

    return NextResponse.json({ message: "Friend Request sent and Notification created", friendRequest, notification }, { status: 200 })
}



