import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import User from '../../../../models/user';
import DefaultLocation from "@/models/default-location";
import FriendList from "@/models/friend-list";
const mongoose = require("mongoose");

// WORKING
// Find and return user
export async function GET(request: Request) {
  await dbConnect();

  try {
    const userId = request.url.slice(request.url.lastIndexOf('/') + 1);
    const user = await User.findById(userId);

    return NextResponse.json(user, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500 });
  }
}

// WORKING
// Delete user default-location, delete friend-list, then delete user
export async function DELETE(request: Request) {
  await dbConnect();

  try {
    // Find user
    console.log("Fetching User");
    const userId = request.url.slice(request.url.lastIndexOf('/') + 1);
    const user = await User.findById(userId);
    console.log(user);

    // Find default-location 
    console.log("Fetching Default Location")
    const defaultLocationId = await user.defaultLocation;
    const defaultLocation = await DefaultLocation.findById(defaultLocationId);
    console.log(defaultLocation)

    // Find friends list
    console.log("Fetching Friends List")
    const friendListId = await user.friendsList;
    const friendList = await FriendList.findById(friendListId);

    // Delete default-location associated with user
    if (defaultLocation) {
      await defaultLocation.deleteOne();
    }

    // Delete friends list associated with user
    if (friendList) {
      await friendList.deleteOne();
    }

    // Delete user
    await user.deleteOne();
    return NextResponse.json({ message: "User deleted" }, { status: 200 });

  } catch (error) {
    console.log(error)
    return NextResponse.json({ status: 500 });
  }
}

