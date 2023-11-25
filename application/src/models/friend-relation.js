import mongoose, { Schema, models } from "mongoose";

const friendRelationSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" // Reference to the User model
  },
  friendId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" // Reference to the User model
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const FriendRelation = models.FriendRelation || mongoose.model("FriendRelation", friendRelationSchema);
export default FriendRelation;