import mongoose, { Schema, models }  from "mongoose";

const meetingLocationSchema = new Schema({
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

const MeetingLocation = models.MeetingLocation || mongoose.model("MeetingLocation", meetingLocationSchema);

export default MeetingLocation;
