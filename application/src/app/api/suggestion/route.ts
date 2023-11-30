import { NextResponse } from 'next/server'
const mongoose = require("mongoose");
import * as utils from "../utils";
import * as suggestionUtils from "./utils";

// Fetch a list of places from Google Maps API and filter results
export async function POST(request: Request) {

  // Get data from request
  const data = await utils.getData(request)
  if (data instanceof NextResponse) {
    return data;
  }

  let response = suggestionUtils.validateSuggestionRequest(data);
  if (response.status != 200) {
    return response;
  }

  const types = data.types;               // type of place to filter in GOOGLE API
  const coordinates = data.coordinates; // list of coordinates with latitude and longitude
  let radius = data.radius;  // radius in meters to search around the midpoint of the coordinates

  let latitude, longitude;
  try {
    let midpoint = suggestionUtils.calculateMidpoint(coordinates);
    latitude = midpoint.latitude;
    longitude = midpoint.longitude;
  } catch (error: any) {
    console.log(error.stack)
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  
  let typesString = suggestionUtils.buildTypeString(types);

  // Fetch places from Google Maps API
  console.log("types" + typesString)
  const apiKey = process.env.GOOGLE_MITM_API_KEY

  let places;
  do{
  places = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${typesString}&key=${apiKey}`)
    .then(response => { return response.json() })
    .catch(error => {
      console.error('Error:', error);
    });
    radius += 5000;
  } while (places.status == "ZERO_RESULTS" && radius < 60000)

  if (places.status == "ZERO_RESULTS") {
    console.log(places.status)
    return NextResponse.json({ message: "No results could be found matching the criteria", places }, { status: 400 });
  }
  

  const results = suggestionUtils.filterResults(places);
  console.log(results);


  return NextResponse.json({ results }, { status: 200 });
}



