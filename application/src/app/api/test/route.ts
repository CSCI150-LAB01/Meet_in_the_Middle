import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const res = Response;
  return Response.json({ message: 'Hello world!' }, { status: 200 });
	// return NextResponse.json({ message: 'Hello world!' }, { status: 200 });
}
