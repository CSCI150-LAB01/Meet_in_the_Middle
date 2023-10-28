// NOTE IT IS POSSIBLE TO LINK TO USER!!!

import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import DefaultLocation from '../../../../models/default-location';
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




// // Get default location for a specific user
// router.get("/:userId/default-location", (req, res) => {
//     const userId = req.params.userId;
  
//     User.findById(userId)
//       .populate("defaultLocation") // Populate the defaultLocation field
//       .exec()
//       .then((user) => {
//         if (!user) {
//           return res.status(404).json({ message: "User not found" });
//         }
  
//         res.status(200).json({ defaultLocation: user.defaultLocation });
//       })
//       .catch((error) => {
//         res.status(500).json({ error: error.message });
//       });
//   });
  
//   // Set the default location for a specific user
//   // POTENTIAL SECURITY RISK!!! USER NOT FOUND?????
//   // POST route to set a user's default location
//   router.post("/:userId/default-location", async (req, res, next) => {
    
//     const userId = req.params.userId;
//     const { coordinates } = req.body;
  
//     try {
//        // Find the user's existing default location
//        let user = await User.findById(userId);
  
//        if (!user) {
//          return res.status(404).json({ message: "User not found" });
//        }
   
//        const existingDefaultLocation = user.defaultLocation;
   
//        // Delete the old default location if it exists
//        if (existingDefaultLocation) {
//          await DefaultLocation.findByIdAndDelete(existingDefaultLocation);
//        }
  
//       // Create a new default location document
//       const defaultLocation = new DefaultLocation({
//         _id: new mongoose.Types.ObjectId(),
//         coordinates: coordinates,
//       });
  
//       // Save the default location
//       const location = await defaultLocation.save();
  
//       // Update the user's defaultLocation reference with the new location's ID
//       user = await User.findByIdAndUpdate(userId, { defaultLocation: location._id }, { new: true });
  
//       res.status(201).json({
//         message: "Default location set successfully",
//         user: user,
//       });
//     } catch (error) {
//       console.error("Error saving default location:", error);
//       res.status(500).json({
//         error: "Error saving default location",
//       });
//     }
//   });