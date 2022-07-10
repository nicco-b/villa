/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
	},
	images: {
		domains: ['files.stripe.com'],
	},
	experimental: { images: { allowFutureImage: true } },
}

module.exports = nextConfig
