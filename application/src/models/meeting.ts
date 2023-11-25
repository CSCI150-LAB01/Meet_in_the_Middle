import mongoose, { Schema, models } from "mongoose";

const meetingSchema = new Schema({
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title : {type: String},
  placeId: {type: String, required : true}, // Google Place ID
  meetingDateTime: {
    type: Date
  },
  pending: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  denied: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  accepted: [
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

const Meeting = models.Meeting || mongoose.model("Meeting", meetingSchema);;

export default Meeting;
