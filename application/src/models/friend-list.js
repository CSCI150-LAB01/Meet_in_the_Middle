import mongoose, { Schema, models } from "mongoose";

const friendListSchema = new Schema({
  // User ID who owns the friend list
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", unique : true// Reference to the User model
  },
  // List of friends (an array of User Ids)
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
  }],
  isFresh : {
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

const FriendList = models.FriendList || mongoose.model("FriendList", friendListSchema);
export default FriendList;