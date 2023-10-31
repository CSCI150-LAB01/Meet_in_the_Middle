import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import User from '@/models/user';
import DefaultLocation from "@/models/default-location";
import FriendList from "@/models/friend-list";
import { getUserById, getData, getFriendListById } from "../utils";

const mongoose = require("mongoose");

export async function POST(request: Request) {
    try {
        dbConnect();
    } catch (error) {
        return NextResponse.json({ message: "Error connecting to database", error }, { status: 500 });
    }

    // Get data from body and check for errors
    const data = await getData(request);
    const userIdA = data.userIdA;
    const userIdB = data.userIdB;
    if (!userIdA || !userIdB) {
        console.log("Missing userIdA or userIdB")
        return NextResponse.json({ message: "Missing userIdA or userIdB" }, { status: 400 });
    } else if (userIdA === userIdB) {
        console.log("Cannot unfriend self")
        return NextResponse.json({ message: "Cannot unfriend self" }, { status: 400 });
    }

    // Get User A and User B
    const userA = await getUserById(userIdA);
    const userB = await getUserById(userIdB);
    if (userA instanceof NextResponse) {
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

    // Check if already friends
    if (!friendListA.friends.includes(userIdB) && !friendListB.friends.includes(userIdA)) {
        console.log("Cannot Unfriend. User A and User B are not friends!")
        return NextResponse.json({ message: "Cannot Unfriend. User A and User B are not friends" }, { status: 400 });
    } else if (!friendListA.friends.includes(userIdB)) {
        console.log("Serrious ERROR, B is friend of A, But A is not friend of B")
        return NextResponse.json({ message: "Serrious ERROR, B is friend of A, But A is not friend of B" }, { status: 400 });
    } else if (!friendListB.friends.includes(userIdA)) {
        console.log("Serrious ERROR, A is friend of B, But B is not friend of A")
        return NextResponse.json({ message: "Serrious ERROR, A is friend of B, But B is not friend of A" }, { status: 400 });
    }

    // Unfriend and save
    await friendListA.friends.remove(userIdB)
    await friendListB.friends.remove(userIdA)
    friendListA.updatedAt = new Date();
    friendListB.updatedAt = new Date();

    try {
        await friendListA.save();
        await friendListB.save();
    } catch (error) {
        return NextResponse.json({ message: "Error saving friend lists", error }, { status: 500 });
    }

    return NextResponse.json({ message: "Friends Removed", friendListA, friendListB }, { status: 200 });
}
