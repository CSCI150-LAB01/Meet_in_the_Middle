// NOTE IT IS POSSIBLE TO LINK TO USER!!!

import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import DefaultLocation from '../../../../../models/default-location';
const mongoose = require("mongoose");

// Return default location by ID
export async function GET(request: Request) {
    await dbConnect();

    try{
    // find location
    const id = request.url.slice(request.url.lastIndexOf('/') + 1);
    const defaultLocation = await DefaultLocation.findById(id);

    if (!defaultLocation) {
        return NextResponse.json({ message: "Default location not found" }, { status: 404 });
      }
    
      // Return location
      return NextResponse.json(defaultLocation, { status: 200 });
      } catch (error) {
        return NextResponse.json(error, { status: 500 });
      }
}


// Delete default location by ID. 
// CAUTION: IT WILL NOT BE UNLINKED TO USER7
export async function DELETE(request: Request) {
    await dbConnect();

    try{
    // find location
    const id = request.url.slice(request.url.lastIndexOf('/') + 1);
    const defaultLocation = await DefaultLocation.findById(id);

    
    if (!defaultLocation) {
        return NextResponse.json({ message: "Default location not found" }, { status: 404 });
      }
    
      // Delete location
        await defaultLocation.deleteOne();
        return NextResponse.json({ message: "Default location deleted" }, { status: 200 });
      } catch (error) {
        return NextResponse.json(error, { status: 500 });
      }
}



