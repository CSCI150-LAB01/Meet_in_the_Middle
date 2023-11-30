import mongoose, { Schema, models } from "mongoose";

const friendRequestSchema = new Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" // Reference to the User model
  },
  recipientId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" // Reference to the User model
  },
  message: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const FriendRequest = models.FriendRequest || mongoose.model("FriendRequest", friendRequestSchema);
export default FriendRequest;