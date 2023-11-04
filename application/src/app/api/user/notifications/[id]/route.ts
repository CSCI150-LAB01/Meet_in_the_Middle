import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import User from '@/models/user';
import FriendList from "@/models/friend-list";
const mongoose = require("mongoose");
import * as utils from "../../../utils"

// Get user's notifications
export async function GET(request: Request) {
    try {
        await dbConnect();
    } catch {
        return NextResponse.json({ message: "Error connecting to database", status: 500 })
    }

    // get user
    const userId = request.url.slice(request.url.lastIndexOf('/') + 1);
    const user = await utils.getUserById(userId);
    if (user instanceof NextResponse) {
        return user;
    }

    // get notifications
    let notifications = await utils.getNotificationsById(user.notificationsId);
    if (notifications instanceof NextResponse) {
        return notifications;
    }
    notifications.isFresh = false;

    // save notifications
    try {
        await notifications.save();
    } catch (error) {
        return NextResponse.json({ message: "Error updating notifications", error, status: 500 })
    }

    const username = user.username;
    return NextResponse.json({ message: username + " notificaitons", notifications }, { status: 200 });
}

// Delete an item from the notifications inbox
export async function DELETE(request: Request) {
    try {
        await dbConnect();
    } catch {
        return NextResponse.json({ message: "Error connecting to database", status: 500 })
    }

    // get data and validate
    const data = await utils.getData(request)
    if (data instanceof NextResponse) {
        return data;
    }
    if (!data.inboxId) {
        return NextResponse.json({ message: "Missing inboxId" }, { status: 400 });
    }

    // get user
    const userId = request.url.slice(request.url.lastIndexOf('/') + 1);
    const user = await utils.getUserById(userId);
    if (user instanceof NextResponse) {
        return user;
    }

    // get notifications
    let notifications = await utils.getNotificationsById(user.notificationsId);
    if (notifications instanceof NextResponse) {
        return notifications;
    }

    // delete inbox entry associated with inboxId
    let found = false;
    for (const entry of notifications.inbox) {
        if (entry.inboxId == data.inboxId) {
            notifications.inbox.pull(entry);
            found = true;
        }
    }
    if (!found) {
        return NextResponse.json({ message: "inboxId not found in inbox" }, { status: 400 });
    }

    // save notificaitons
    notifications.updatedAt = new Date();
    try {
        await notifications.save();
    } catch (error) {
        return NextResponse.json({ message: "Error updating notifications", error, status: 500 })
    }

    return NextResponse.json({ message: "Notificaitons", notifications }, { status: 200 });
}

