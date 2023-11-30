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
