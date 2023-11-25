import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
const mongoose = require("mongoose");

import {getData, getUserById} from "../../../utils";

import FriendRelation from "@/models/friend-relation";
import FriendRequest from "@/models/friend-request";

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
    if (!data.senderId) {
        return NextResponse.json({ message: "Missing recipientId", status: 400 })
    }
    const senderId = data.senderId;

    const userId = request.url.slice(request.url.lastIndexOf('/') + 1);

    let friendRequest = await FriendRequest.findOne({ senderId: senderId, recipientId: userId })
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


