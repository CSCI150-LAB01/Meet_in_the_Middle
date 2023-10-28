import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import User from '../../../models/user';
const mongoose = require("mongoose");

export async function GET() {
    await dbConnect();

    try {
        const res = await User.find();
        return NextResponse.json(res, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}