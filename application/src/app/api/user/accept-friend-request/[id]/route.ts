import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import FriendRequests from '@/models/friend-requests';
import FriendList from '@/models/friend-list';
import Notification from "@/models/notifications";
const mongoose = require("mongoose");
import * as utils from "../../../utils"

// Accept friend request
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
    const senderFriendList = await utils.getFriendListById(sender.friendListId);
    if (senderFriendList instanceof NextResponse) {
        return senderFriendList;
    }
    for (const someFriend of senderFriendList.friends) {
        if (someFriend.userId === userId) {
            return NextResponse.json({ message: "Friend already exists" }, { status: 400 })
        }
    }

    // get user and user friend list
    const user = await utils.getUserById(userId);
    if (user instanceof NextResponse) {
        return user;
    }
    const userFriendList = await utils.getFriendListById(user.friendListId);
    if (userFriendList instanceof NextResponse) {
        return userFriendList;
    }

    // check if user and sender are friends
    for (const someFriend of userFriendList.friends) {
        if (someFriend.userId === senderId) {
            return NextResponse.json({ message: "Friend already exists" }, { status: 400 })
        }
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

    // Add user to sender's friend list
    senderFriendList.friends.push({ userId });
    senderFriendList.isFresh = true;
    senderFriendList.updatedAt = Date.now();

    // Add sender to user's friend list
    userFriendList.friends.push({ userId: senderId });
    userFriendList.isFresh = true;
    userFriendList.updatedAt = Date.now();

    // Add notification to sender
    let senderNotifications = await utils.getNotificationsById(sender.notificationId)
    if (senderNotifications instanceof NextResponse) {
        return senderNotifications;
    }
    const username = user.username;
    senderNotifications.inbox.push({ message: username + " accepted friend request from ", senderId: userId, isRead : false,  type: "friend-request"});
    senderNotifications.isFresh = true;
    senderNotifications.updatedAt = Date.now();

    for (const request of senderFriendRequests.incomingRequests) {
        if (request.senderId == userId) {
            return NextResponse.json({ message: "ERROR in send-friend-request: Should never send and not receive request" }, { status: 400 })
        }
    }

    try {
        await senderFriendRequests.save()
        await userFriendRequests.save()
        await senderFriendList.save()
        await userFriendList.save()
        await senderNotifications.save()
    } catch {
        return NextResponse.json({ message: "Error saving to database", status: 500 })
    }

    return NextResponse.json({ message: "Friends added", senderFriendList, userFriendList }, { status: 200 })
}



