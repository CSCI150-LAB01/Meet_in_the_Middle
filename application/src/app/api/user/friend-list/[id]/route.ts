import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import User from '@/models/user';
import DefaultLocation from "@/models/default-location";
import FriendList from "@/models/friend-list";
const mongoose = require("mongoose");

// Responds with user's friend list
export async function GET(request: Request) {
    try {
        await dbConnect();
    } catch {
        return NextResponse.json({ message: "Error connecting to database", status: 500 })
    }

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

