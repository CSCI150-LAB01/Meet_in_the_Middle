import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import FriendRequests from '@/models/friend-requests';
import FriendList from '@/models/friend-list';
const mongoose = require("mongoose");
import * as utils from "../../../utils"

// Reject friend request from sender to user
export async function POST(request: Request) {
    try {
        await dbConnect();
    } catch {
        return NextResponse.json({ message: "Error connecting to database", status: 500 })
    }
    
    // Get data from body and url
    const data = await utils.getData(request)
    if (data instanceof NextResponse) {
        return data;
    }
    const senderId = data.senderId;
    const userId = request.url.slice(request.url.lastIndexOf('/') + 1);
    
    // check that all fields are present in body
    if (!senderId) {
        return NextResponse.json({ message: "senderId required" }, { status: 400 });
    }

    // check if friend is self
    if (senderId === userId) {
        return NextResponse.json({ message: "Cannot make friends with self" }, { status: 400 })
    }

    // get sender and sender friend list
    const sender = await utils.getUserById(senderId);
    if (sender instanceof NextResponse) {
        return sender;
    }

    // get user and user friend list
    const user = await utils.getUserById(userId);
    if (user instanceof NextResponse) {
        return user;
    }

    // get user friend requests, proposed-friend friend requests
    let userFriendRequests = await utils.getFriendRequestById(user.friendRequestsId)
    if (userFriendRequests instanceof NextResponse) {
        return userFriendRequests;
    }
    let senderFriendRequests = await utils.getFriendRequestById(sender.friendRequestsId)
    if (senderFriendRequests instanceof NextResponse) {
        return senderFriendRequests;
    }

    // Delete sender outgoing request
    for (const request of senderFriendRequests.outgoingRequests) {
        if (request.recipientId == senderId) {
            senderFriendRequests.outgoingRequests.pull(request);
        }
    }

    // Delete user incoming request
    for (const request of userFriendRequests.incomingRequests) {
        if (request.recipientId == userId) {
            userFriendRequests.incomingRequests.pull(request);
        }
    }

    try {
        await senderFriendRequests.save();
        await userFriendRequests.save();
    } catch { 
        return NextResponse.json({ message: "Error saving friend requests", status: 500 })
    }

    return NextResponse.json({ message: "Friends added", senderFriendRequests, userFriendRequests }, { status: 200 })
}



