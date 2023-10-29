import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import DefaultLocation from '@/models/default-location';
import User from '@/models/user';
const mongoose = require("mongoose");

// Create new default location for a specific user
// If the user already has a default location, delete it
export async function POST(request: Request) {
  await dbConnect();

  try {
    const data = await request.json();
    const coordinates = data.coordinates;

    const userId = request.url.slice(request.url.lastIndexOf('/') + 1);
    const user = await User.findById(userId);
    
    // Create a new default location object
    const defaultLocation = await new DefaultLocation({
      _id: new mongoose.Types.ObjectId(),
      coordinates: coordinates
    });
    defaultLocation.save();

    // Delete the old default location object
    const oldDefaultLocationId = user.defaultLocationId;
    if (oldDefaultLocationId) {
      await DefaultLocation.findByIdAndDelete(oldDefaultLocationId);
    }

    // Update the user's defaultLocation reference with the new location's ID
    user.defaultLocationId = defaultLocation._id;
    user.save();
    
    console.log({ message: "\ndefaultLocation" }, defaultLocation);
    return NextResponse.json({ message: "Default location set successfully" }, { status: 201 });

  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function GET(request: Request) {
  await dbConnect();
  try{
    // Get user ID from request
    const userId = request.url.slice(request.url.lastIndexOf('/') + 1);
    const user = await User.findById(userId);
    
    console.log("HERE IS HOW FAR WE GET")
    if (!userId) {
      return NextResponse.json({ message: "Provide userId in GET request" }, { status: 400 });
    }

    // Find the user
    console.log("User")
    console.log(user)

    // Find the user's default location
    const defaultLocation = await DefaultLocation.findById(user.defaultLocationId);
    console.log("DefaultLocation")
    console.log(defaultLocation)

    return NextResponse.json(defaultLocation, { status: 200 });

  }catch(error){
    return NextResponse.json(error, { status: 500 });
  }
}