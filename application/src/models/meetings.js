import mongoose, { Schema, models } from "mongoose";

const meetingsSchema = new Schema({
  // Owner of the meeting
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  // Array of meetings
  meetings: [
    {
      // Meeting location ID
      meetingLocationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MeetingLocation", // Reference to the MeetingLocation model
      },
      // List of member IDs
      members: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Reference to the User model
        },
      ],
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
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Meetings = models.Meetings || mongoose.model("Meetings", meetingsSchema);;

export default Meetings;
