import mongoose from "mongoose";

const meetingLocationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  coordinates: { type: [Number], index: "2dsphere", required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const MeetingLocation = mongoose.model("MeetingLocation", meetingLocationSchema);

export default MeetingLocation;
