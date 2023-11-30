import dbConnect from '@/lib/db';
import { NextResponse } from 'next/server';
import User from '@/models/user';
import { getUserById, getData } from '../../utils';
import FriendRelation from '@/models/friend-relation';

const mongoose = require('mongoose');

export async function DELETE(request: Request) {
	try {
		dbConnect();
	} catch (error) {
		return NextResponse.json(
			{ message: 'Error connecting to database', error },
			{ status: 500 },
		);
	}

	// Get data from body and error check
	const data = await getData(request);
	if (data instanceof NextResponse) {
		return data;
	}
	const friendId = data.friendId;
	if (!friendId) {
		return NextResponse.json({ message: 'Missing friendId' }, { status: 400 });
	}

	const userId = request.url.slice(request.url.lastIndexOf('/') + 1);
	if (userId === friendId) {
		return NextResponse.json(
			{ message: 'Cannot remove self as friend' },
			{ status: 400 },
		);
	}

	try {
		await FriendRelation.deleteOne({ userId, friendId });
		await FriendRelation.deleteOne({ userId: friendId, friendId: userId });
	} catch (error) {
		return NextResponse.json(
			{ message: 'Error deleting friend relation', error },
			{ status: 500 },
		);
	}

	return NextResponse.json(
		{ message: 'Successfully removed friend', friendId },
		{ status: 200 },
	);
}
