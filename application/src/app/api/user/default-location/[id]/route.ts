import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import DefaultLocation from '../../../../../models/default-location';
import User from '../../../../../models/user';
const mongoose = require("mongoose");

// Create new default location for a specific user
// If the user already has a default location, delete it
export async function POST(request: Request) {
  await dbConnect();

  try {
    const id = request.url.slice(request.url.lastIndexOf('/') + 1);
    const user = await User.findById(id);
    
    const data = await request.json();
    const coordinates = data.coordinates;
    
    // Create a new default location object
    const defaultLocation = await new DefaultLocation({
      _id: new mongoose.Types.ObjectId(),
      coordinates: coordinates
    });
    defaultLocation.save();

    // Delete the old default location object
    const oldDefaultLocation = user.defaultLocation;
    if (oldDefaultLocation) {
      await DefaultLocation.findByIdAndDelete(oldDefaultLocation);
    }

    // Update the user's defaultLocation reference with the new location's ID
    user.defaultLocation = defaultLocation._id;
    user.save();
    
    console.log({ message: "\ndefaultLocation" }, defaultLocation);
    return NextResponse.json({ message: "Default location set successfully" }, { status: 201 });

  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
