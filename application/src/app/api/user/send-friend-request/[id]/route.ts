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
    // return NextResponse.json({ message: "Friend Requests POST" }, { status: 200 })

    // Get data from body and check for errors
    const data = await utils.getData(request)
    if (data instanceof NextResponse) {
        return data;
    }

    const userId = request.url
        .slice(request.url.lastIndexOf('/') + 1);
    const proposedFriendId = data.friendId;
    const message = data.message;

    // check that all fields are present in body`
    if (!proposedFriendId) {
        return NextResponse.json({ message: "FriendId required" }, { status: 400 });
    }

    // check for self
    if (proposedFriendId === userId) {
        return NextResponse.json({ message: "Cannot send friend request to self" }, { status: 400 })
    }

    // get friend
    const proposedFriend = await utils.getUserById(proposedFriendId);
    if (proposedFriend instanceof NextResponse) {
        return proposedFriend;
    }


    // USER CHECKS

    // get user
    const user = await utils.getUserById(userId);
    if (user instanceof NextResponse) {
        return user;
    }

    // get user friend list
    const friendList = await utils.getFriendListById(user.friendListId);

    // NEED TO TEST IF following check works!!!!!!!!!!!
    // check if user and friend are already friends
    friendList.friends.forEach((someUser: any) => {
        if (someUser.userId === proposedFriendId) {
            return NextResponse.json({ message: "Friend already exists" }, { status: 400 })
        }
    })

    // get user friend requests
    let userFriendRequests = await utils.getFriendRequestById(user.friendRequestsId)
    if (userFriendRequests instanceof NextResponse) {
        return userFriendRequests;
    }

    // NEED TO TEST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // check if friend request already exists for user
    userFriendRequests.outgoingRequests.forEach((someRequest: any) => {
        if (someRequest.recepientId === proposedFriendId) {
            return NextResponse.json({ message: "Friend request already exists" }, { status: 400 })
        }
    })

    // get proposed friend friend requests
    let proposedFriendRequests = await utils.getFriendRequestById(proposedFriend.friendRequestsId)
    if (proposedFriendRequests instanceof NextResponse) {
        return proposedFriendRequests;
    }

    // POTENTIALLY MISSING LOGIC
    // Update user's friend requests
    console.log({message: "proposed", proposedFriendId})
    userFriendRequests.outgoingRequests.push({ recipientId: proposedFriendId, message });
    userFriendRequests.isFresh = true;
    userFriendRequests.updatedAt = Date.now();

    // Update proposed-friend's friend requests
    proposedFriendRequests.incomingRequests.push({ senderId: userId, message });
    proposedFriendRequests.isFresh=true;
    proposedFriendRequests.updatedAt=Date.now();



    // save 
    // try {
    //     await userFriendRequests.save()
    //     await proposedFriendRequests.save()
    // } catch{
    //     return NextResponse.json({ message: "Error saving user or proposed friend", status: 500 })
    // }

    return NextResponse.json({ message: "Friend Requests POST", userFriendRequests, proposedFriendRequests }, { status: 200 })
}



