// NOTE IT IS POSSIBLE TO LINK TO USER!!!

import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import DefaultLocation from '../../../../models/default-location.js';
const mongoose = require("mongoose");

// WORKING
// Add default location to database. 
// CAUTION: IT WILL NOT BE LINKED TO USER
export async function POST(request: Request) {
  await dbConnect();

  try {
    // Get location from request body
    const data = await request.json();
    const coordinates = data.coordinates;

    if (!data || !coordinates) {
      return NextResponse.json({ message: "Provide coordinates in POST request" }, { status: 400 });
    }

    // Create new location
    const defaultLocation = await new DefaultLocation({
      _id: new mongoose.Types.ObjectId(),
      coordinates: coordinates
    });

    // Save location
    console.log({ message: "coordinates" }, coordinates);
    await defaultLocation.save();
    return NextResponse.json({ message: "Default location added to database. Location is NOT LINKED TO USER" }, { status: 201 });

  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}