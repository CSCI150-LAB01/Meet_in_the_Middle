import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import DefaultLocation from '../../../../models/default-location';
const mongoose = require("mongoose");


// WORKING
// Return list of all default locations
export async function GET(request: Request) {
    await dbConnect();

    try {
        const res = await DefaultLocation.find();

        return NextResponse.json(res, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}