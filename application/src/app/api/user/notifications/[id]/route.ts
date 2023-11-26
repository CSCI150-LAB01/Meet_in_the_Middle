import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import User from '@/models/user';
const mongoose = require("mongoose");
import {getData, getUserById} from "../../../utils"
import Notification from "@/models/notification";
import { getNotificationById } from "../utils";

// Get user's notifications
export async function GET(request: Request) {
    try {
        await dbConnect();
    } catch {
        return NextResponse.json({ message: "Error connecting to database", status: 500 })
    }

    // get user
    const userId = request.url.slice(request.url.lastIndexOf('/') + 1);
    const user = await getUserById(userId);
    if (user instanceof NextResponse) {
        return user;
    }

    // get notifications
    let notifications;
    try {
    notifications = await Notification.find({userId}, '-__v');
    } catch (error) {
        return NextResponse.json({ message: "Error retrieving notifications", error, status: 500 })
    }

    return NextResponse.json({ message: "Successfully returned notifications", notifications }, { status: 200 });
}

// Delete an item from the notifications inbox
export async function DELETE(request: Request) {
    try {
        await dbConnect();
    } catch {
        return NextResponse.json({ message: "Error connecting to database", status: 500 })
    }

    // get data from querry
    const data = await getData(request)
    if (data instanceof NextResponse) {
        return data;
    }
    
    // get user from url
    const userId = request.url.slice(request.url.lastIndexOf('/') + 1);
    const user = await getUserById(userId);
    if (user instanceof NextResponse) {
        return user;
    }

    // get notification
    const notification = await getNotificationById(data.notificationId);
    if (notification instanceof NextResponse) {
        return notification;
    }

    // check if notification is in user's notifications
    if (userId != notification.userId) {
        return NextResponse.json({ message: "Notification not found in user's notifications", status: 404 })
    }

    // delete notification
    try {
        await Notification.deleteOne({_id : notification._id});
    } catch (error) {
        return NextResponse.json({ message: "Error deleting notification", error, status: 500 })
    }
    
    return NextResponse.json({ message: "Notificaiton deleted"}, { status: 200 });
}

