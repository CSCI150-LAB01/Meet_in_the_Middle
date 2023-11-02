import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import FriendRequests from '@/models/friend-requests';
import FriendList from '@/models/friend-list';
const mongoose = require("mongoose");
import * as utils from "../../../utils"

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
    const proposedFriendId = data.recipientId;
    const message = data.message;
    const userId = request.url.slice(request.url.lastIndexOf('/') + 1);

    // check that all fields are present in body
    if (!proposedFriendId) {
        return NextResponse.json({ message: "FriendId required" }, { status: 400 });
    }

    // check if friend is self
    if (proposedFriendId === userId) {
        return NextResponse.json({ message: "Cannot send friend request to self" }, { status: 400 })
    }

    // get proposed-friend 
    const proposedFriend = await utils.getUserById(proposedFriendId);
    if (proposedFriend instanceof NextResponse) {
        return proposedFriend;
    }

    // get user and friend list
    const user = await utils.getUserById(userId);
    if (user instanceof NextResponse) {
        return user;
    }
    const friendList = await utils.getFriendListById(user.friendListId);
    if (friendList instanceof NextResponse) {
        return friendList;
    }

    // check if user and friend are already friends
    for (const someFriend of friendList.friends) {
        if (someFriend.userId === proposedFriendId) {
            return NextResponse.json({ message: "Friend already exists" }, { status: 400 })
        }
    }

    // get user friend requests, proposed-friend friend requests
    let userFriendRequests = await utils.getFriendRequestById(user.friendRequestsId)
    if (userFriendRequests instanceof NextResponse) {
        return userFriendRequests;
    }
    let proposedFriendRequests = await utils.getFriendRequestById(proposedFriend.friendRequestsId)
    if (proposedFriendRequests instanceof NextResponse) {
        return proposedFriendRequests;
    }

    // check if a request already exists
    for (const request of userFriendRequests.outgoingRequests) {
        if (request.recipientId == proposedFriendId) {
            return NextResponse.json({ message: "Friend request already exists" }, { status: 400 })
        }
    }
    for (const request of proposedFriendRequests.incomingRequests) {
        if (request.senderId == userId) {
            return NextResponse.json({ message: "ERROR in send-friend-request: Should never send and not receive request" }, { status: 400 })
        }
    }

    // Update user's friend requests
    await userFriendRequests.outgoingRequests.push({ recipientId: proposedFriendId, message });
    userFriendRequests.isFresh = true;
    userFriendRequests.updatedAt = Date.now();

    // Update proposed-friend's friend requests
    await proposedFriendRequests.incomingRequests.push({ senderId: userId, message });
    proposedFriendRequests.isFresh = true;
    proposedFriendRequests.updatedAt = Date.now();

    try {
        await userFriendRequests.save()
        await proposedFriendRequests.save()
    } catch {
        return NextResponse.json({ message: "Error saving user request or proposed friend request", status: 500 })
    }

    return NextResponse.json({ message: "Friend Request Sent", userId, userFriendRequests, proposedFriendRequests }, { status: 200 })
}



