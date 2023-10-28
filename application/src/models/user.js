import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true, unique: true, match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ },
    password: { type: String, required: true },
    username: { type: String, required: true },
    defaultLocation: { type: mongoose.Schema.Types.ObjectId, ref: "DefaultLocation" },
    friendList: { type: mongoose.Schema.Types.ObjectId, ref: "FriendList" }
    // defaultLocations: required needs to be set to true!!!!
});

const User = models.User || mongoose.model("User", userSchema);
export default User;