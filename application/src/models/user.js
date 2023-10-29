import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true, unique: true, match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ },
    password: { type: String, required: true },
    username: { type: String, required: true },
    defaultLocationId: { type: mongoose.Schema.Types.ObjectId, ref: "DefaultLocation" },
    friendListId: { type: mongoose.Schema.Types.ObjectId, ref: "FriendList" },
    image: { type: String, required: false },
    meetings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meeting" }],
    bio: { type: String, required: false, maxlength: 500 },
    // Created at timestamp
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // Updated at timestamp
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const User = models.User || mongoose.model("User", userSchema);
export default User;