import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import User from '@/models/user';
import DefaultLocation from "@/models/default-location";
import FriendList from "@/models/friend-list";
const mongoose = require("mongoose");

// Responds with user's friend list
export async function GET(request: Request) {
    await dbConnect();

    try {
        const userId = request.url.slice(request.url.lastIndexOf('/') + 1);

        console.log("Fetching Friend List");
        const friendList = await FriendList.findOne({ userId });
        console.log(friendList);

        return NextResponse.json({ friendList }, { status: 200 });
    } catch {
        return NextResponse.json({ message: "Error returning friends list", status: 500 })
    }
}

// Add friend to user's friend list
export async function POST(request: Request) {
    await dbConnect();

    try {
        // Find User
        //console.log("check")

        const userId = request.url.slice(request.url.lastIndexOf('/') + 1);
        console.log("Validating User");
        const user = await User.findById(userId);

        NextResponse.json(user, { status: 200 });


        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        console.log(user);

        // Get data from body
        console.log("Fetching Data: FriendID");
        const data = await request.json();
        const friendId = data.friendId;
        console.log(data);

        // Validate Friend is a user
        console.log("Validating Friend");
        const friend = await User.findById(friendId);
        if (!friend) {
            return NextResponse.json({ message: "Friend not found" }, { status: 404 });
        }
        console.log(friend);

        // Get Friend List
        console.log("Fetching Friend List");
        console.log(user._id);
        const friendList = await FriendList.findById(user.friendListId);
        console.log(friendList);

        console.log(friendId)
        // Check if already friends
        if (friendList.friends.includes(friendId)) {
            return NextResponse.json({ message: "Already friends" }, { status: 400 });
        }

        // Add friend to friend list
        console.log("Adding Friend to Friend List");
        friendList.friends.push(friendId);
        console.log(friendList);

        friendList.updatedAt = new Date();
        await friendList.save();
        await user.save();

        return NextResponse.json({ message: "Friend Added", friendList }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Error adding to friends list", error }, { status: 500 });
    }
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
        
    } catch {
        return NextResponse.json({ message: "Error removing from friends list" }, { status: 500 })
    }
}

