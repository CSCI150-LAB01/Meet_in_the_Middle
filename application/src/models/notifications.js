import mongoose, { Schema, models } from "mongoose";

const notificationsSchema = new Schema({
    // User ID who owns the friend list
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", unique: true// Reference to the User model
    },
    // List of notifications
    inbox: [{
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
        },
        message: {
            type: String,
            default: "",
            maxLength: 500,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        type : {
            type: String,
            default: "",
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

const Notifications = models.Notifications || mongoose.model("Notifications", notificationsSchema);
export default Notifications;