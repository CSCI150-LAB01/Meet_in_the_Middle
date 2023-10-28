import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import User from '../../../../models/user';
import DefaultLocation from "@/models/default-location";
const mongoose = require("mongoose");

// WORKING
// Find and return user
export async function GET(request: Request) {
  await dbConnect();

  try {
    const id = request.url.slice(request.url.lastIndexOf('/') + 1);
    const user = await User.findById(id);

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
    const id = request.url.slice(request.url.lastIndexOf('/') + 1);
    const user = await User.findById(id);
    
    // Find default-location 
    const defaultLocationId = await user.defaultLocation;
    const defaultLocation = await DefaultLocation.findById(defaultLocationId);
    
    // Find friends list
    // insert code here
    
    // Delete default-location associated with user
    if (defaultLocation) {
      await defaultLocation.deleteOne();
    }
    
    // Delete friends list!!!!!!!!!!!!!!!!!!!!!!!!
    
    // Delete user
    await user.deleteOne();
    return NextResponse.json({ message: "User deleted" }, { status: 200 });

  } catch (error) {
    console.log(error)
    return NextResponse.json({ status: 500 });
  }
}

