export default function logMapElements(
	value: any,
	key: any,
	map: Map<any, any>,
): void {
	console.log(`map.get('${key}') = ${value}`);
}

export function formatDateTime(inputDateTime: string): string {
	const options: Intl.DateTimeFormatOptions = {
		month: 'short',
		day: 'numeric',
		weekday: 'long',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	};

	const date = new Date(inputDateTime);
	const formattedDateTime = date.toLocaleString('en-US', options);

	return formattedDateTime;
}

export const suggestionOptions = [
	'amusement_park',
	'art_gallery',
	'bar',
	'bowling_alley',
	'cafe',
	'campground',
	'casino',
	'clothing_store',
	'department_store',
	'gym',
	'hair_care',
	'movie_theater',
	'museum',
	'night_club',
	'park',
	'restaurant',
	'shoe_store',
	'shopping_mall',
	'spa',
	'zoo',
];
