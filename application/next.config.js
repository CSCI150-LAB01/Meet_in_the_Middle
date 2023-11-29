/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
	images: {
		remotePatterns : [
			{
				protocol:'https',
				hostname: 'via.placeholder.com',
				port: '',
				pathname: '/400x300'
			},
		],
	},
	reactStrictMode: process.env.NODE_ENV === 'production',
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
};

module.exports = nextConfig;
