import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import User from '../../../../models/user';
import DefaultLocation from "@/models/default-location";
const mongoose = require("mongoose");

//const {searchParams} = new URL(request.url)

// SECURITY RISK - by returning "EMAIL ALREADY EXISTS"
export async function POST(request: Request) {
    await dbConnect();

    try {
        const data = await request.json();
        const email = data.email;
        const password = data.password;
        const username = data.username;
        //const location = data.location;

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
            // const defaultLocation = await new DefaultLocation({
            //     _id: new mongoose.Types.ObjectId(),
            //     coordinates: location
            // });
            // defaultLocation.save();
            // console.log(defaultLocation);
            
            // create user
            user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: email,
                password: password,
                // NEED TO HASH PASSWORD!!!!
                username: username,
                //location: defaultLocation._id
            });

            console.log(user)
            user.save();
            return NextResponse.json({ message: "User created" }, { status: 201 });
        }
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
