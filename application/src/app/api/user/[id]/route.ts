import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
const mongoose = require("mongoose");
import * as utils from "../../utils"

import User from '../../../../models/user';
import DefaultLocation from "@/models/default-location";
import Meeting from "@/models/meeting";
import FriendRelation from "@/models/friend-relation";
import FriendRequest from "@/models/friend-request";
import Notification from "@/models/notification";

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

  return NextResponse.json({ user: user }, { status: 200 });
}

// Delete user and all associated data
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

  // Delete meetings
  try {
    await Meeting.deleteMany({ creatorId: userId });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting meetings", error, status: 500 })
  }

  // Delete friend relations
  try {
    await FriendRelation.deleteMany({ userId: userId });
    await FriendRelation.deleteMany({ friendId: userId });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting friend relations", error, status: 500 })
  }

  // Delete friend requests
  try {
    await FriendRequest.deleteMany({ userId: userId });
    await FriendRequest.deleteMany({ friendId: userId });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting friend requests", error, status: 500 })
  }

  // Delete notifications
  try {
    await Notification.deleteMany({ userId: userId });
    await Notification.deleteMany({ friendId: userId });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting friend requests", error, status: 500 })
  }

  // Find default-location 
  const defaultLocation = await utils.getDefaultLocationById(user.defaultLocationId);
  if (defaultLocation instanceof NextResponse) {
    return defaultLocation;
  }

  try {
    await defaultLocation.deleteOne();
    await user.deleteOne();
  } catch (error) {
    return NextResponse.json({ message: "Error deleting one of the objects in database", error, status: 500 })
  }

  return NextResponse.json({ message: "User deleted", user: user }, { status: 200 });

}

