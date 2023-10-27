import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import User from '../../../../models/user';
const mongoose = require("mongoose");

export async function DELETE(request: Request) {
  await dbConnect();

  const id = request.url.slice(request.url.lastIndexOf('/') + 1);
  const user = User.findById(id);

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  try {
    // NEED LOGIC HERE TO DELETE LOCATION BEFORE DELETING USER
    await user.deleteOne();
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

