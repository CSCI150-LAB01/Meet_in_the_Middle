const mongoose = require("mongoose");
import FriendRelation from "@/models/friend-relation";


export async function isFriends(userId: String, friendId: String) {
    const relation = await FriendRelation.findOne({ userId, friendId }, '-__v');
    if (relation) {
        return true;
    } else {
        return false;
    }
}