import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import DefaultLocation from '@/models/default-location';
import User from '@/models/user';
const mongoose = require("mongoose");
import * as utils from "../../../utils"

// Get user's default locaiton
export async function GET(request: Request) {
  await dbConnect();

    // Get user ID from request
    const userId = request.url.slice(request.url.lastIndexOf('/') + 1);
    const user = await utils.getUserById(userId);
    if (user instanceof NextResponse) {
      return user
    }

    // Find the user's default location
    const defaultLocation = await utils.getDefaultLocationById(user.defaultLocationId);
    if (defaultLocation instanceof NextResponse) {
      return defaultLocation
    }

    return NextResponse.json({ message: "Successfully returned default location", defaultLocation}, { status: 200 });
}


// Add user's default location, if it already exists, delete it and add the new one
export async function POST(request: Request) {
  await dbConnect();

  // get coordinates from request and validate
  const data = await request.json();
  const coordinates = data.coordinates;
  if ((!coordinates[0] && !coordinates[1]) || !coordinates[0] || !coordinates[1] || coordinates[2]) {
    return NextResponse.json({ message: "Invalid coordinates" }, { status: 400 });
  }
  if (coordinates[0] <= -180 || coordinates[0] >= 180 || coordinates[1] <= -90 || coordinates[1] >= 90) {
    return NextResponse.json({ message: "Longitude must be between -180 and 180, latitude must be between -90 and 90" }, { status: 400 });
  }

  // get user
  const userId = request.url.slice(request.url.lastIndexOf('/') + 1);
  const user = await utils.getUserById(userId);
  if (user instanceof NextResponse) {
    return user
  }

  // Create a new default location 
  const defaultLocation = await new DefaultLocation({
    _id: new mongoose.Types.ObjectId(),
    coordinates: coordinates
  });
  defaultLocation.updatedAt = Date.now();
  user.updatedAt = Date.now();

  // Delete the old default location
  const oldDefaultLocationId = user.defaultLocationId;
  try {
    if (oldDefaultLocationId) {
      await DefaultLocation.findByIdAndDelete(oldDefaultLocationId);
    }
  } catch (error) {
    return NextResponse.json({ message: "error deleting default location", error }, { status: 500 });
  }

  // Update user default location ID and save
  user.defaultLocationId = defaultLocation._id;
  try {
    await defaultLocation.save();
    await user.save();
  } catch (error) {
    return NextResponse.json({ message: "error saving to database", error }, { status: 500 });
  }

  console.log({ message: "\ndefaultLocation" }, defaultLocation);
  return NextResponse.json({ message: "Success", defaultLocation }, { status: 201 });
}

