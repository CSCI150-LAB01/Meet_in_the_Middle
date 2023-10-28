// FOR DEBUGGING ONLY
import dbConnect from "@/lib/db";
import FriendList from '@/models/friend-list';
const mongoose = require("mongoose");
import { NextResponse } from 'next/server'

// check valid id, check if it is user
export async function POST(request: Request) {
    await dbConnect();

    try {
        const data = await request.json();
        console.log(data);
        console.log("Data.friends")
        console.log(data.friends);

        const friendList = await new FriendList({
            _id: new mongoose.Types.ObjectId(),
            friendList: data.friends,
            userId: data.userId
        });
        console.log("Friend List");
        console.log(friendList);
        //friendList.save();
        return NextResponse.json({ message: "Friend list added to database", friendList }, { status: 201 });
    } catch (error) {
        if (error instanceof SyntaxError) {
            console.log("Syntax Error");
            return NextResponse.json({message : "Syntax Error"}, { status: 400 });
        } else{
        return NextResponse.json(error, { status: 500 });
        }
    }
}

export async function GET(request: Request) {
    try {
        console.log("GET FRIEND LIST");
        const friendList = await FriendList.find();

        return NextResponse.json({ message: "No friend list found" }, { status: 404 });

        console.log(friendList);
        return NextResponse.json(friendList, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}