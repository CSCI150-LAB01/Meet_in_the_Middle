import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import User from '../../../models/user';
const mongoose = require("mongoose");

export async function GET() {
    try {
        await dbConnect();
    }
    catch (error) {
        return NextResponse.json({ message: "error connecting to database" }, { status: 500 });
    }

    try {
        const users = await User.find({}, '-__v');
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}


