export default function logMapElements(
	value: any,
	key: any,
	map: Map<any, any>,
): void {
	console.log(`map.get('${key}') = ${value}`);
}
