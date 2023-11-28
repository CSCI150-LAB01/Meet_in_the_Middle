import { NextResponse } from "next/server";
import { getUserById, getData } from '@/app/api/utils';

export async function validatePOSTRequest(request: any) {
	const data = await getData(request);
	if (data instanceof NextResponse) {
		return data;
	}

	if (!data.meetingId) {
		return NextResponse.json(
			{ message: 'Missing required field meetingId' },
			{ status: 400 },
		);
	}

	return data;
}