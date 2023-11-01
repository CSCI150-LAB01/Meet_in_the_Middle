export async function createUser(
	email: string,
	password: string,
	username: string,
	coordinates: [number, number] = [0, 0],
): Promise<any> {
	// Validate coordinates range
	const [longitude, latitude] = coordinates;
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

export async function loginUser(email: string, password: string): Promise<any> {
	const apiUrl = '/api/user/login';

	const requestBody = {
		email,
		password,
	};

	try {
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		});

		if (!response.ok) {
			// Handle non-successful HTTP responses (e.g., 4xx, 5xx)
			throw new Error(
				`Failed to log in: ${response.status} - ${response.statusText}`,
			);
		}

		// Parse and return the response JSON
		return await response.json();
	} catch (error) {
		throw error;
	}
}
