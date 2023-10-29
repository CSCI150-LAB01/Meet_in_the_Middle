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
        const friendList = await FriendList.findOne({userId});
        console.log(friendList);

        return NextResponse.json(friendList, { status: 200 });
    } catch {
        return NextResponse.json({message: "Error returning friends list", status : 500})
    }
}

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
        console.log(data);
        const friendId = data.friendId;

        // Validate Friend is a user
        const friend = await User.findById(friendId);
        if (!friend) {
            return NextResponse.json({ message: "Friend not found" }, { status: 404 });
        }

        // Get Friend List
        console.log("Fetching Friend List");
        const friendList = await FriendList.findById(friendId);
        console.log(friendList);

        // Add friend to friend list
        console.log("Adding Friend to Friend List");
        friendList.friends.push(friendId);
        console.log(friendList);

        //user.save();

        return NextResponse.json(user, { status: 200 });

    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

// Remove friend from user's friend list
export async function REMOVE(request: Request) {
    // code
}

