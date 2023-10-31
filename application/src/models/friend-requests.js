import mongoose, {Schema, models} from "mongoose";

const friendRequestsSchema = new Schema({
    // Owner of the requests
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
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

const FriendRequests = models.FriendRequests || mongoose.model("FriendRequests", friendRequestsSchema);
export default FriendRequests;
