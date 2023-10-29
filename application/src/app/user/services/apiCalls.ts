export async function createUser(
	email: string,
	password: string,
	username: string,
	coordinates: [number, number] = [0, 0],
): Promise<any> {
	// Validate coordinates range
	const [latitude, longitude] = coordinates;
	if (longitude < -180 || longitude > 180 || latitude < -90 || latitude > 90) {
		throw new Error('Invalid coordinates range');
	}

	const requestBody = {
		email,
		password,
		username,
		coordinates,
	};

	const apiUrl = '/api/user/signup/';

	try {
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		});

		if (!response.ok) {
			throw new Error(
				`Failed to create user: ${response.status} - ${response.statusText}`,
			);
		}

		return await response.json();
	} catch (error) {
		throw error;
	}
}
