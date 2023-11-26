import mongoose, { Schema, models } from "mongoose";

const notificationSchema = new Schema({
    // User ID who owns the friend list
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", unique: false// Reference to the User model
    },
    message: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Notification = models.Notification || mongoose.model("Notification", notificationSchema);
export default Notification;