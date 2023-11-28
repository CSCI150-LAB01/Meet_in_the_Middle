import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import FriendRequest from '@/models/friend-request';
const mongoose = require("mongoose");
import { getUserById, getData } from "../../../utils"

// Responds with user's friend requests
export async function GET(request: Request) {
    try {
        await dbConnect();
    } catch {
        return NextResponse.json({ message: "Error connecting to database", status: 500 })
    }

    const userId = request.url.slice(request.url.lastIndexOf('/') + 1);

    console.log("Fetching Friend Requests");
    try {
        const friendRequests = await FriendRequest.find({ recipientId: userId })
        return NextResponse.json({ message: "Successfully returned friend requests", userId, friendRequsts: friendRequests }, { status: 200 });

    } catch {
        return NextResponse.json({ message: "Error returning friends requests", status: 500 })
    }
}

// deletes a friend request
export async function DELETE(request: Request) {
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
    const recipientId = data.recipientId;

    const userId = request.url.slice(request.url.lastIndexOf('/') + 1);

    let friendRequest = await FriendRequest.findOne({ senderId: userId, recipientId: recipientId })
    if (!friendRequest) {
        return NextResponse.json({ message: "Friend request not found", status: 404 })
    }

    try {
        await friendRequest.deleteOne()
    } catch {
        return NextResponse.json({ message: "Error deleting friend request", status: 500 })
    }

    return NextResponse.json({ message: "Friend request deleted", status: 200 })

}