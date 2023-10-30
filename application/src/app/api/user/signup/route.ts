import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import User from '../../../../models/user';
import FriendList from '@/models/friend-list';
import DefaultLocation from "@/models/default-location";
import bcrypt from 'bcrypt';
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
        
        if (data.coordinates[0] < -180 || data.coordinates[0] > 180 || data.coordinates[1] < -90 || data.coordinates[1] > 90) {
            return NextResponse.json({ message: "Invalid coordinates" }, { status: 400 });
        }
        
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

            // encrypt password
            const encryptedPassword = await bcrypt.hash(password, 10);

            // create user
            user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: email,
                password: encryptedPassword,
                username: username,
                friendListId: friendList._id,
                defaultLocationId: defaultLocation._id
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
            await defaultLocation.save();
            await friendList.save();
            await user.save();
            return NextResponse.json({ message: "User created", user }, { status: 201 });
        }
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
