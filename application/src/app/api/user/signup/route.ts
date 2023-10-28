import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import User from '../../../../models/user';
import FriendList from '@/models/friend-list';
import DefaultLocation from "@/models/default-location";
const mongoose = require("mongoose");

//const {searchParams} = new URL(request.url)

// SECURITY RISK - by returning "EMAIL ALREADY EXISTS"
export async function POST(request: Request) {
    await dbConnect();

    try {
        console.log("Fetching Data")
        const data = await request.json();
        console.log(data);
        
        const email = data.email;
        const password = data.password;
        const username = data.username;
        
        let coordinates = data.coordinates;
        if (!coordinates)
        {
            coordinates = [0.0, 0.0];
        }

        // check for all fields
        if (!email || !password || !username) {
            return NextResponse.json({ message: "Email, Password, and Username required" }, { status: 400 });
        }

        // check if email exists
        let user = await User.findOne({ email: email });

        if (user) {
            return NextResponse.json({ message: "Email already exists" }, { status: 409 });
        } else {

            // create default location
            const defaultLocation = await new DefaultLocation({
                _id: new mongoose.Types.ObjectId(),
                coordinates: coordinates,
            });

            // create friend list
            const friendList = await new FriendList({
                _id: new mongoose.Types.ObjectId(),
                friends: [],
            });
            
            // create user
            user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: email,
                password: password,
                username: username,
                friendList: friendList._id,
                defaultLocation: defaultLocation._id
            });

            // Add userId to friend list and default location
            friendList.userId = user._id;
            defaultLocation.userId = user._id;

            // Log friend list, user, default location
            console.log("Friend List")
            console.log(friendList)
            console.log("User")
            console.log(user)
            console.log("Default Location")
            console.log(defaultLocation)

            // Save user and friend list
            user.save();
            friendList.save();
            defaultLocation.save();
            return NextResponse.json({ message: "User created" }, { status: 201 });
        }
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
