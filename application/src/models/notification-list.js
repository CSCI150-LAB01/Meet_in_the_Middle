import mongoose, { Schema, models } from "mongoose";

const notificationListSchema = new Schema({
    // User ID who owns the friend list
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", unique: true// Reference to the User model
    },
    // List of friends (an array of User Ids)
    notifications: [{
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
        },
        message: {
            type: String,
            default: "",
            maxLength: 500,
        },
    }],
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

const NotificationList = models.NotificationList || mongoose.model("NotificationList", notificationListSchema);
export default NotificationList;