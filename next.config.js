/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
	},
	images: {
		domains: ['us-southeast-1.linodeobjects.com'],
	},
}

module.exports = nextConfig
