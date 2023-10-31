import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import User from '../../../models/user';
import FriendList from '@/models/friend-list';
import DefaultLocation from "@/models/default-location";
import bcrypt from 'bcrypt';
import FriendRequests from "@/models/friend-requests";
import Meetings from "@/models/meetings";
const mongoose = require("mongoose");
import * as utils from "../utils"

//const {searchParams} = new URL(request.url)

// SECURITY RISK - by returning "EMAIL ALREADY EXISTS"
export async function POST(request: Request) {
    try {
        await dbConnect();
    } catch {
        return NextResponse.json({ message: "Error connecting to database", status: 500 })
    }

    // Get data from body and check for errors
    const data = await utils.getData(request)
    if (data instanceof NextResponse) {
        return data;
    }
    const email = data.email;
    const password = data.password;
    const username = data.username;

    // check for valid coordinates
    let coordinates = data.coordinates;
    if (!coordinates) {
        coordinates = [0.0, 0.0];
    }
    if (data.coordinates[0] < -180 || data.coordinates[0] > 180 || data.coordinates[1] < -90 || data.coordinates[1] > 90) {
        return NextResponse.json({ message: "Invalid coordinates" }, { status: 400 });
    }

    // check for all fields
    if (!email || !password || !username) {
        return NextResponse.json({ message: "Email, Password, and Username required" }, { status: 400 });
    }

    // check if email exists
    let testUser;
    try {
        testUser = await User.findOne({ email });
    } catch (error) {
        return NextResponse.json({ message: ".findOne() error", error }, { status: 500 });
    }
    if (testUser) {
        return NextResponse.json({ message: "Email not available" }, { status: 400 });
    }

    // create default location
    let defaultLocation;
    try {
        defaultLocation = await new DefaultLocation({
            _id: new mongoose.Types.ObjectId(),
            coordinates: coordinates,
        });
    } catch (error) {
        return NextResponse.json({ message: "Error creating default location", error }, { status: 500 });
    }

    // create friend list
    let friendList
    try {
        friendList = await new FriendList({
            _id: new mongoose.Types.ObjectId(),
            friends: [],
        });
    } catch (error) {
        return NextResponse.json({ message: "Error creating friend list", error }, { status: 500 });
    }

    // create meetings
    let meetings;
    try {
        meetings = await new Meetings({
            _id: new mongoose.Types.ObjectId(),
            meetings: [],
        });
    } catch (error) {
        return NextResponse.json({ message: "Error creating meetings", error }, { status: 500 });
    }

    // create friend-requsts
    let friendRequests;
    try {
        friendRequests = await new FriendRequests({
            _id: new mongoose.Types.ObjectId(),
            requests: [],
        })
    } catch (error) {
        return NextResponse.json({ message: "Error creating friend requests", error }, { status: 500 });
    }

    // encrypt password
    let encryptedPassword
    try {
        encryptedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
        return NextResponse.json({ message: "Error encrypting password", error }, { status: 500 });
    }

    // create user
    let user;
    try {
        user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: email,
            password: encryptedPassword,
            username: username,
            friendListId: friendList._id,
            defaultLocationId: defaultLocation._id,
            meetingsId: meetings._id,
            friendRequestsId: friendRequests._id
        });
    } catch (error) {
        return NextResponse.json({ message: "Error creating user", error }, { status: 500 });
    }

    // Add userId to friend list and default location
    friendList.userId = user._id;
    defaultLocation.userId = user._id;
    meetings.userId = user._id;
    friendRequests.userId = user._id;

    // Save user, friend list, friend requests default location
    try {
        await friendList.save();
    }
    catch (error) {
        return NextResponse.json({ message: "Error saving friend list", error }, { status: 500 });
    }

    try {
        await meetings.save();
    } catch (error) {
        return NextResponse.json({ message: "Error saving meetings", error }, { status: 500 });
    }

    try {
        await friendRequests.save();
    } catch (error) {
        return NextResponse.json({ message: "Error saving friend requests", error }, { status: 500 });
    }

    try {
        await defaultLocation.save();
    }
    catch (error) {
        return NextResponse.json({ message: "Error saving default location", error }, { status: 500 });
    }

    try {
        await user.save();
    }
    catch (error) {
        return NextResponse.json({ message: "Error saving user", error }, { status: 500 });
    }

    return NextResponse.json({ message: "User created", user }, { status: 201 });
}
