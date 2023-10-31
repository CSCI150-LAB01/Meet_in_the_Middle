import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import User from '@/models/user';
import DefaultLocation from "@/models/default-location";
import FriendList from "@/models/friend-list";

const mongoose = require("mongoose");

export async function getUserById(userId: string) {
    let user;
    try {
        user = await User.findById(userId)
    } catch (error: any) {
        if (error instanceof mongoose.Error.CastError) {
            console.log("User Not Found")
            return NextResponse.json({ message: "User Not Found", error }, { status: 404 });
        }
        console.log(error.stack)
        return NextResponse.json({ message: "Error retrieving user by Id" }, { status: 500 });
    }
    return user;
}

export async function getData(request: Request) {
    try {
        const res = await request.json();
        return res;
    } catch (error: any) {
        console.log(error.stack)
        return NextResponse.json({ message: "Internal Error, request.json()" }, { status: 500 });
    }
}

export async function getFriendListById(friendListId: string) {
    let friendList;
    try {
        friendList = await FriendList.findById(friendListId);
    } catch (error: any) {
        if (error instanceof mongoose.Error.CastError) {
            console.log("Friend List Not Found")
            return NextResponse.json({ message: "Friend List Not Found", error }, { status: 404 });
        }
        console.log(error.stack)
        return NextResponse.json({ message: "Error retrieving friend list by Id" }, { status: 500 });
    }

    return friendList;
}