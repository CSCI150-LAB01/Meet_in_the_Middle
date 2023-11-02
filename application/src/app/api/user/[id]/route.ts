import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import User from '../../../../models/user';
import DefaultLocation from "@/models/default-location";
import FriendList from "@/models/friend-list";
import FriendRequests from "@/models/friend-requests";
const mongoose = require("mongoose");
import * as utils from "../../utils"

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
  try{
  await dbConnect();
  } catch {
    return NextResponse.json({ message: "Error connecting to database", status: 500 })
  }
  
    // Find user
    console.log("Fetching User");
    const userId = request.url.slice(request.url.lastIndexOf('/') + 1);
    const user = await utils.getUserById(userId);
    if (user instanceof NextResponse) {
      return user;
    }
    console.log(user);
    
    // Find default-location 
    console.log("Fetching Default Location")
    const defaultLocation = await utils.getDefaultLocationById(user.defaultLocationId);
    if (defaultLocation instanceof NextResponse) {
      return defaultLocation;
    }
    console.log(defaultLocation)
    
    // Find friends list
    console.log("Fetching Friends List")
    const friendList = await utils.getFriendListById(user.friendListId);
    if (friendList instanceof NextResponse) {
      return friendList;
    }
    console.log(friendList)

    // Find friend requests
    console.log("Fetching Friend Requests")
    const friendRequests = await utils.getFriendRequestById(user.friendRequestsId);
    if (friendRequests instanceof NextResponse) {
      return friendRequests;
    }
    console.log(friendRequests)


    // Delete default-location, friends list, and friend requests
   await friendList.deleteOne();
   await defaultLocation.deleteOne();
   await friendRequests.deleteOne();
    
    
    // Delete user
    await user.deleteOne();
    return NextResponse.json({ message: "User deleted" }, { status: 200 });

}

