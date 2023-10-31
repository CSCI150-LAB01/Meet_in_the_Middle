import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import User from '../../../models/user';
import bcrypt from 'bcrypt';
const mongoose = require("mongoose");

export async function POST(request: Request) {
  await dbConnect();

  try {
    const data = await request.json();
    const email = data.email;
    const password = data.password;

    if (!email || !password) {
      return null
    }

    const user = await User.findOne({ email });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    return NextResponse.json(user, { status: 200 });

  } catch (error) {
    return NextResponse.json({message: "Auth Failed", error}, { status: 500 });
  }
}

