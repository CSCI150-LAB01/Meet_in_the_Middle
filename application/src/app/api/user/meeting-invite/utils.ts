import { NextResponse } from "next/server";
import { getData } from "../../utils";

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
	if (!data.users) {
		return NextResponse.json(
			{ message: 'Missing required field users' },
			{ status: 400 },
		);
	}
	if (!Array.isArray(data.users)) {
		return NextResponse.json(
			{ message: 'Field users must be of type array' },
			{ status: 400 },
		);
	}
    return data;
}