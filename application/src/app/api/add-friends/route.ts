import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import User from '@/models/user';
import DefaultLocation from "@/models/default-location";
import FriendList from "@/models/friend-list";
import { getUserById, getData, getFriendListById } from "../utils";

const mongoose = require("mongoose");

// Add friend to user's friend list
export async function POST(request: Request) {
    
    try {
    await dbConnect()
    }catch (error) {
        return NextResponse.json({ message: "Error connecting to database", error }, { status: 500 });
    }

    // Get data from body and check for errors
    const data = await getData(request);
    const userIdA  = data.userIdA;
    const userIdB = data.userIdB;
    if (!userIdA || !userIdB) {
        console.log("Missing userIdA or userIdB")
        return NextResponse.json({ message: "Missing userIdA or userIdB" }, { status: 400 });
    } else if (userIdA === userIdB) {
        console.log("Cannot add self as friend")
        return NextResponse.json({ message: "Cannot add self as friend" }, { status: 400 });
    }
    
    // Get User A and User B
    const userA = await getUserById(userIdA);
    const userB = await getUserById(userIdB);
    if(userA instanceof NextResponse){
        return userA;
    } else if (userB instanceof NextResponse) {
        return userB;
    }
    
    // Get Friend List A and Friend List B
    const friendListA = await getFriendListById(userA.friendListId);
    const friendListB = await getFriendListById(userB.friendListId);
    if (friendListA instanceof NextResponse) {
        return friendListA;
    } else if (friendListB instanceof NextResponse) {
        return friendListB;
    }
    
    // Check if already friends, NEEDS TESTING!!!!!!!!!!!!!!!!
    if (friendListA.friends.includes(userIdB)||friendListB.friends.includes(userIdA)) {
        console.log("Already friends")
        return NextResponse.json({ message: "Already friends" }, { status: 400 });
    }
    
    // Make friends
    await friendListA.friends.push(userIdB);
    await friendListB.friends.push(userIdA);
    friendListA.updatedAt = new Date();
    friendListB.updatedAt = new Date();

    try {
    await friendListA.save();
    await friendListB.save();
    } catch (error) {
        return NextResponse.json({ message: "Error saving friend lists", error }, { status: 500 });
    }
       
    return NextResponse.json({ message: "Friends Added", friendListA, friendListB }, { status: 200 });
}

// Remove friend from user's friend list
export async function DELETE(request: Request) {
    await dbConnect();

    try {
        const userId = request.url.slice(request.url.lastIndexOf('/') + 1);
        const user = await User.findById(userId);

        const data = await request.json();
        const friendId = data.friendId;

        console.log("Validating Friend");
        const friend = await User.findById(friendId);
        console.log(friend);

        console.log("Fetching Friend List");
        const friendList = await FriendList.findById(user.friendListId);
        console.log(friendList);

        // Check if friend is in friend list
        if (!friendList.friends.includes(friendId)) {
            return NextResponse.json({ message: "Friend not found in friend list" }, { status: 404 });
        }

        // Remove friend from friend list
        console.log("Removing Friend from Friend List");
        friendList.friends.pull(friendId);
        console.log(friendList);

        friendList.updatedAt = new Date();
        //friendList.save();

        return NextResponse.json({ message: "Friend Removed", friendList }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ message: "Error removing from friends list" }, { status: 500 })
    }
}

