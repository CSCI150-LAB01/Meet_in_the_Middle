import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import User from '@/models/user';
const mongoose = require("mongoose");
import FriendRelation from '@/models/friend-relation';

// Responds with user's friend list
export async function GET(request: Request) {
    try {
        await dbConnect();
    } catch {
        return NextResponse.json({ message: "Error connecting to database", status: 500 })
    }

    const userId = request.url.slice(request.url.lastIndexOf('/') + 1);

    let relations;
    try {

        relations = await FriendRelation.find({ userId });
    } catch (error) {
        return NextResponse.json({ message: "Error getting friend relations", error, status: 500 })
    }
    const friendIds = relations.map(relation => relation.friendId);

    return NextResponse.json({ message: "Successfully returned friendIds", friendIds})
}

