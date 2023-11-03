import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import User from '@/models/user';
import FriendList from "@/models/friend-list";
const mongoose = require("mongoose");
import * as utils from "../../../utils"

// Responds with user's notification
export async function GET(request: Request) {
    try {
        await dbConnect();
    } catch {
        return NextResponse.json({ message: "Error connecting to database", status: 500 })
    }

    try {
        const userId = request.url.slice(request.url.lastIndexOf('/') + 1);

        console.log("Fetching Notifications");
        const notifications = await utils.getNotificationsById(userId);
        if (notifications instanceof NextResponse) {
            return notifications;
        }
        console.log(notifications);

        return NextResponse.json({ message: "Notificaitons", notifications }, { status: 200 });
    } catch {
        return NextResponse.json({ message: "Error returning notification list", status: 500 })
    }
}

