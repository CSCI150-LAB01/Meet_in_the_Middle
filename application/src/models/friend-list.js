// NEEDS TESTING

import mongoose, { Schema, models } from "mongoose";

const friendListSchema = new Schema({
  // User ID who owns the friend list
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  // List of friends (an array of User references)
  friendList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
  }],
});

const FriendList = models.FriendList || mongoose.model("FriendList", friendListSchema);
export default FriendList;