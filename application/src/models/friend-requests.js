import mongoose, { Schema, models } from "mongoose";

const friendRequestsSchema = new Schema({
    // Owner of the requests
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // Array of requests
    incomingRequests: [
        {
            // Meeting location ID
            senderId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", // Reference to the User model,
                required: true,
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
    outgoingRequests: [
        {
            // Meeting location ID
            recipientId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", // Reference to the User model
                required: true,

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
    // Set if there is a new Incoming Request
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

const FriendRequests = models.FriendRequests || mongoose.model("FriendRequests", friendRequestsSchema);
export default FriendRequests;
