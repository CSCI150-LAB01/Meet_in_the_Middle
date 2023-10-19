/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
	reactStrictMode: process.env.NODE_ENV === 'production',
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
};

module.exports = nextConfig;
