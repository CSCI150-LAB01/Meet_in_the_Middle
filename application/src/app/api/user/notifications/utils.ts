import { NextResponse } from "next/server";
import Notification from "@/models/notification";
const mongoose = require("mongoose");

export async function getNotificationById(notificationId: string) {
    let notification;
    try {
        notification = await Notification.findById(notificationId);
    } catch (error: any) {
        if (error instanceof mongoose.Error.CastError) {
            console.log("Default Location Not Found")
            return NextResponse.json({ message: "Notificaiton Not Found", error }, { status: 404 });
        }
        console.log(error.stack)
        return NextResponse.json({ message: "Error retrieving Notification by Id" }, { status: 500 });
    }
    if (!notification) {
        return NextResponse.json({ message: "Notificaiton Not Found" }, { status: 404 });
    }
    return notification;
}