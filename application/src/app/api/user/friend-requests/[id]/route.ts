import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import FriendRequests from '@/models/friend-requests';
const mongoose = require("mongoose");

// Responds with user's friend requests
export async function GET(request: Request) {
    try {
        await dbConnect();
    } catch {
        return NextResponse.json({ message: "Error connecting to database", status: 500 })
    }

    
    try {
        const userId = request.url.slice(request.url.lastIndexOf('/') + 1);
        
        console.log("Fetching Friend Requests");
        const friendRequests = await FriendRequests.find({userId});
        console.log(friendRequests);
        
        return NextResponse.json({ friendRequests }, { status: 200 });
    } catch {
        return NextResponse.json({ message: "Error returning friends requests", status: 500 })
    }
}

