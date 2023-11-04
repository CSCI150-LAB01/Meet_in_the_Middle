import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import User from '@/models/user';
import DefaultLocation from "@/models/default-location";
import FriendList from "@/models/friend-list";
import { getUserById, getData, getFriendListById } from "../../../utils";

const mongoose = require("mongoose");


export async function DELETE(request: Request) {
    try {
        dbConnect();
    } catch (error) {
        return NextResponse.json({ message: "Error connecting to database", error }, { status: 500 });
    }

    const userId = request.url.slice(request.url.lastIndexOf('/') + 1);

    // Get data from body and error check
    const data = await getData(request);
    if (data instanceof NextResponse) {
        return data;
    }
    
    const friendId = data.friendId;
    if (!userId || !friendId) {
        console.log("Missing user or friend")
        return NextResponse.json({ message: "Missing userIdA or userIdB" }, { status: 400 });
    } else if (userId === friendId) {
        console.log("Cannot unfriend self")
        return NextResponse.json({ message: "Cannot unfriend self" }, { status: 400 });
    }

    // Get User and Friend
    const user = await getUserById(userId);
    const friend = await getUserById(friendId);
    if (user instanceof NextResponse) {
        return user;
    } else if (friend instanceof NextResponse) {
        return friend;
    }

    // Get User's Friend List and Friend's Friend List
    const userFriendList = await getFriendListById(user.friendListId);
    const friendFriendList = await getFriendListById(friend.friendListId);
    if (userFriendList instanceof NextResponse) {
        return userFriendList;
    } else if (friendFriendList instanceof NextResponse) {
        return friendFriendList;
    }

    // Check if already friends
    if (!userFriendList.friends.includes(friendId) && !friendFriendList.friends.includes(userId)) {
        console.log("Cannot Unfriend. User A and User B are not friends!")
        return NextResponse.json({ message: "Cannot Unfriend. User A and User B are not friends" }, { status: 400 });
    } else if (!userFriendList.friends.includes(friendId)) {
        console.log("Serrious ERROR, B is friend of A, But A is not friend of B")
        return NextResponse.json({ message: "Serrious ERROR, B is friend of A, But A is not friend of B" }, { status: 400 });
    } else if (!friendFriendList.friends.includes(userId)) {
        console.log("Serrious ERROR, A is friend of B, But B is not friend of A")
        return NextResponse.json({ message: "Serrious ERROR, A is friend of B, But B is not friend of A" }, { status: 400 });
    }

    // Unfriend and save
    await userFriendList.friends.remove(friendId)
    await friendFriendList.friends.remove(userId)
    userFriendList.updatedAt = new Date();
    friendFriendList.updatedAt = new Date();

    try {
        await userFriendList.save();
        await friendFriendList.save();
    } catch (error) {
        return NextResponse.json({ message: "Error saving friend lists", error }, { status: 500 });
    }

    return NextResponse.json({ message: "Friends Removed", userFriendList: userFriendList, friendFriendList: friendFriendList }, { status: 200 });
}
