import mongoose, { Schema, models } from "mongoose";

const notificationSchema = new Schema({
    // User ID who owns the friend list
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", unique: true// Reference to the User model
    },
    message: {
        type: String,
    },
    isFresh: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Notification = models.Notification || mongoose.model("Notification", notificationSchema);
export default Notification;