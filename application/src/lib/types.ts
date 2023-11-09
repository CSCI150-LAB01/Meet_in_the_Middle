export type Location = {
	lat: number;
	lng: number;
};

export interface MapData {
	currentLocation: {
		lat: number;
		lng: number;
	};
	markers: {
		lat: number;
		lng: number;
	}[];
	map: any;
	placeholderText: string;
}
