import mongoose, { Schema, models } from "mongoose";

const meetingsSchema = new Schema({
  // Owner of the meeting
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  meetingLocationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MeetingLocation",
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
