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
  try {
    await dbConnect();
  }
  catch (error) {
    return NextResponse.json({ message: "Error connecting to database", error, status: 500 })
  }

  const userId = request.url.slice(request.url.lastIndexOf('/') + 1);
  const user = await utils.getUserById(userId);
  if (user instanceof NextResponse) {
    return user
  }

  return NextResponse.json( {user : user}, { status: 200 });
}

// WORKING
// Delete user default-location, delete friend-list, then delete user
export async function DELETE(request: Request) {
  try {
    await dbConnect();
  } catch {
    return NextResponse.json({ message: "Error connecting to database", status: 500 })
  }

  // Find user
  const userId = request.url.slice(request.url.lastIndexOf('/') + 1);
  const user = await utils.getUserById(userId);
  if (user instanceof NextResponse) {
    return user;
  }

  // Find meetings
  const meetings = await utils.getMeetingsById(user.meetingsId);
  if (meetings instanceof NextResponse) {
    return meetings;
  }

  // Find default-location 
  const defaultLocation = await utils.getDefaultLocationById(user.defaultLocationId);
  if (defaultLocation instanceof NextResponse) {
    return defaultLocation;
  }

  // Find friends list
  const friendList = await utils.getFriendListById(user.friendListId);
  if (friendList instanceof NextResponse) {
    return friendList;
  }

  // Find friend requests
  const friendRequests = await utils.getFriendRequestById(user.friendRequestsId);
  if (friendRequests instanceof NextResponse) {
    return friendRequests;
  }

  // Find notifications
  const notifications = await utils.getNotificationsById(user.notificationsId);
  if (notifications instanceof NextResponse) {
    return notifications;
  }

  // Delete default-location, friends list, and friend requests
try{
  await friendList.deleteOne();
  await defaultLocation.deleteOne();
  await friendRequests.deleteOne();
  await notifications.deleteOne();
  await meetings.deleteOne();
  await user.deleteOne();
}catch (error) {
  return NextResponse.json({ message: "Error deleting one of the objects in database", error, status: 500 })
}

  // Delete user
  return NextResponse.json({ message: "User deleted", user : user }, { status: 200 });

}

