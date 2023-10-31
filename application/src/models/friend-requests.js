import mongoose from "mongoose";

const friendRequestsSchema = new mongoose.Schema({
    // Owner of the requests
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    // Array of requests
    requests: [
        {
            // Meeting location ID
            requestId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", // Reference to the User model
            },
            message: {
                type: String,
                default: "",
                maxLength: 500,
            },
            // Created at timestamp
            createdAt: {
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

const FriendRequests = mongoose.model("FriendRequests", friendRequestsSchema);

export default FriendRequests;
