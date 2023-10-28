// FOR DEBUGGING ONLY
import dbConnect from "@/lib/db";
import FriendList from '@/models/friend-list';
const mongoose = require("mongoose");
import { NextResponse } from 'next/server'

// check valid id, check if it is user
// WORKING
// Post friend list to database 
export async function POST(request: Request) {
    await dbConnect();

    try {
        console.log("Fetching Data")
        const data = await request.json();
        console.log(data);

        const friendList = await new FriendList({
            _id: new mongoose.Types.ObjectId(),
            friends: data.friends,
            userId: data.userId
        });

        console.log("Friend List");
        console.log(friendList);
        friendList.save();

        return NextResponse.json({ message: "Friend list added to database, USER IS NOT LINKED TO FRIENDLIST", friendList }, { status: 201 });
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
        console.log("Fetching FRIEND LIST");
        const friendList = await FriendList.find();
        console.log(friendList);

        return NextResponse.json(friendList, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "No friend list found" }, { status: 404 });
    }
}

export async function DELETE(request: Request){
    await dbConnect();
    try{
        console.log("Fetching Friend List");
        const data = await request.json();
        console.log(data);

        console.log("Deleting Friend List");
        const friendList = await FriendList.findByIdAndDelete(data._id);
        console.log(friendList);
        return NextResponse.json({message: "Friend List Deleted"}, {status: 200});

    }catch(error){
        return NextResponse.json({ message: "No friend list found" }, { status: 404 });
    }
}