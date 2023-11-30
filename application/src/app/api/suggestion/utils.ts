import { NextResponse } from "next/server";
import { PLACE_TYPES } from "../constants";
import { type } from "os";

export function validateSuggestionRequest(data: any) {

    const types = data.types;               // type of place to filter in GOOGLE API
    const coordinates = data.coordinates; // list of coordinates with latitude and longitude
    const radius = data.radius;  // radius in meters to search around the midpoint of the coordinates

    // coordinates
    if (coordinates == null) {
        return NextResponse.json({ message: "Missing coordinates" }, { status: 400 });
    }
    if (Array.isArray(coordinates) == false) {
        return NextResponse.json({ message: "Coordinates must be in an array" }, { status: 400 });
    }
    if (coordinates.length < 1 || coordinates.length > 10) {
        return NextResponse.json({ message: "1-10 coordinates must be provided" }, { status: 400 });
    }
    if (Array.isArray(coordinates) == false) {
        return NextResponse.json({ message: "type must be in an array" }, { status: 400 });
    }
    
    // radius
    if (radius == null) {
        return NextResponse.json({ message: "Missing radius" }, { status: 400 });
    }
    if (radius < 0 || radius > 40000) {
        return NextResponse.json({ message: "Radius must be between 0 and 40000 meters" }, { status: 400 });
    }

    // types
    if (types == null) {
        return NextResponse.json({ message: "Missing types" }, { status: 400 });
    }
    if (Array.isArray(types) == false) {
        return NextResponse.json({ message: "Types must be in an array" }, { status: 400 });
    }
    if (types.length > 5) {
        return NextResponse.json({ message: "Types field can contain a maximum of 5 values" }, { status: 400 });
    }
    for (let type of types) {
        if (PLACE_TYPES.has(type) == false) {
            return NextResponse.json({ message: "Invalid type" }, { status: 400 });
        }
    }

    return NextResponse.json({ message: "Success" }, { status: 200 });
}

export class CoordinatesError extends Error {
    name: string;
    message: string;

    constructor(message: string) {
        super(message);
        this.name = "INVALID_COORDINATES";
        this.message = message;
    }
}

export function calculateMidpoint(coordinates: any){
    // Find midpoint of all coordinates
  let latitudeSum = 0;
  let longitudeSum = 0;
  for (let coordinate of coordinates) {
    if (coordinate.latitude <= -90 || coordinate.latitude >= 90 || coordinate.longitude <= -180 || coordinate.longitude >= 180) {
      throw new CoordinatesError("Invalid coordinates");
    }
    latitudeSum += coordinate.latitude;
    longitudeSum += coordinate.longitude;
  }
  const latitude = latitudeSum / coordinates.length;
  const longitude = longitudeSum / coordinates.length;

  return {latitude, longitude};
}

export function buildTypeString(types: string): string {
    let typesString = "";
    for (let type of types) {
      typesString += type + "|";
    }
    typesString = typesString.substring(0, typesString.length - 1);
    return typesString;
}

export function filterResults(places : any) {
    let results = places.results;
    let filteredResults = [];
    for (let result of results) {
        let filteredResult = {
            name: result.name,
            place_id: result.place_id,
            rating: result.rating,
            types: result.types,
            user_ratings_total: result.user_ratings_total,
            vicinity: result.vicinity
        }
        filteredResults.push(filteredResult);
    }
    return filteredResults;
}