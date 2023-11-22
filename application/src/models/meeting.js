import mongoose, { Schema, models } from "mongoose";

const meetingSchema = new Schema({
  // Owner of the meeting
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  meetingLocationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MeetingLocation",
  },
  meetingDate: {
    type: Date
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  isFresh: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Meeting = models.Meeting || mongoose.model("Meeting", meetingSchema);;

export default Meeting;
