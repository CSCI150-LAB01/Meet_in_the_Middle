// contact google places

// send coordinates [lat, lng]

// return a list of places

// return dummy place data

// Using the fetch API

//!!!! filter for places types!!!!!!

import dbConnect from "@/lib/db";
import { NextResponse } from 'next/server'
import DefaultLocation from "@/models/default-location";
import FriendList from "@/models/friend-list";
import FriendRequests from "@/models/friend-requests";
const mongoose = require("mongoose");

// WORKING
// Find and return user
export async function GET(request: Request) {
  try {
    await dbConnect();
  }
  catch (error) {
    return NextResponse.json({ message: "Error connecting to database", error, status: 500 })
  }


  const apiKey = process.env.GOOGLE_MITM_API_KEY

  const latitude = 40.7128;
  const longitude = -74.0060;
  const radius = 1000;
  const restaurant = 'restaurant'

  const data = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${restaurant}&key=${apiKey}`)
    .then(response => { return response.json() })
    // .then(data => {
    //   console.log('Data:', data);
    //   return data;
    // })
    .catch(error => {
      console.error('Error:', error);
    });

  return NextResponse.json({ message: data }, { status: 200 });
}

export async function POST(request: Request) {

  try {
    await dbConnect();
  }
  catch (error) {
    return NextResponse.json({ message: "Error connecting to database", error, status: 500 })
  }


  const apiKey = process.env.GOOGLE_MITM_API_KEY

  const latitude = 40.7128;
  const longitude = -74.0060;
  const radius = 1000;

  const placeId = 'ChIJOwg_06VPwokRYv534QaPC8g'

  const data = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`)
    .then(response => { return response.json() })
    // .then(data => {
    //   console.log('Data:', data);
    //   return data;
    // })
    .catch(error => {
      console.error('Error:', error);
    });

  return NextResponse.json({ message: data }, { status: 200 });

}



