import dbConnect from '@/lib/db';
import { NextResponse } from 'next/server';
import User from '../../../models/user';
import bcrypt from 'bcrypt';

export async function POST(request: Request): Promise<void | Response> {
	await dbConnect();

	try {
		const data = await request.json();
		const email = data.email;
		const password = data.password;

    if (!email || !password) {
      return NextResponse.json({ message: "email and password required" }, { status: 400 });
    }

		const user = await User.findOne({ email });
		if (!user) {
			return NextResponse.json({ message: 'User not found' }, { status: 404 });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return NextResponse.json(
				{ message: 'Invalid password' },
				{ status: 401 },
			);
		}

		return NextResponse.json(user, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: 'Auth Failed', error },
			{ status: 500 },
		);
	}
}
