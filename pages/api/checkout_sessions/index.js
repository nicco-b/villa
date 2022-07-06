const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27',
})
import { NextApiRequest, NextApiResponse } from 'next'
const { validateCartItems } = require('use-shopping-cart/utilities')
const inventory = [
	{
		name: 'Bananas',
		description: 'Yummy yellow fruit',
		id: 'price_1LHMVIHFFw3ZIEqv4zXNFN4k',
		price: 90,
		price_id: 'price_1LHMVIHFFw3ZIEqv4zXNFN4k',
		image:
			'https://images.unsplash.com/photo-1574226516831-e1dff420e562?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=225&q=80',
		attribution: 'Photo by Priscilla Du Preez on Unsplash',
		currency: 'USD',
	},
	{
		name: 'Tangerines',
		id: 'price_1LHMVIHFFw3ZIEqv4zXNFN4k',

		image:
			'https://images.unsplash.com/photo-1482012792084-a0c3725f289f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=225&q=80',
		attribution: 'Photo by Jonathan Pielmayer on Unsplash',
		currency: 'USD',
	},
]
export default async function handler(req, res) {
	if (req.method === 'POST') {
		console.log(req.body)
		try {
			// const line_items = await validateCartItems(
			// 	inventory,

			// 	{
			// 		price_1LHMVIHFFw3ZIEqv4zXNFN4k: {
			// 			quantity: 1,
			// 		},
			// 	}
			// )
			const params = {
				submit_type: 'pay',
				payment_method_types: ['card'],
				billing_address_collection: 'auto',
				shipping_address_collection: {
					allowed_countries: ['US', 'CA'],
				},
				line_items: req.body,
				success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${req.headers.origin}/`,
				mode: 'payment',
			}
			// Create Checkout Sessions from body params.
			const session = await stripe.checkout.sessions.create(params)
			res.status(200).json(session)
		} catch (err) {
			res.status(err.statusCode || 500).json(err.message)
		}
	} else {
		res.setHeader('Allow', 'POST')
		res.status(405).end('Method Not Allowed')
	}
}
