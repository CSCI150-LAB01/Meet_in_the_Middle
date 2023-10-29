import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
  
  // Owner of the meeting
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  
    // Meeting location ID
  meetingLocationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MeetingLocation", // Reference to the MeetingLocation model
  },
  // List of member IDs
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
  }],
  // Date of the meeting
  date: {
    type: Date,
    default: Date.now,
  },
  // Created at timestamp
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Updated at timestamp
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Meeting = mongoose.model("Meeting", meetingSchema);

export default Meeting;
