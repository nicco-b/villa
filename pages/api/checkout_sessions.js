const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27',
})
import { NextApiRequest, NextApiResponse } from 'next'
const { validateCartItems } = require('use-shopping-cart/utilities')
const inventory = [
	{
		name: 'Bananas',
		description: 'Yummy yellow fruit',
		id: 'sku_GBJ2Ep8246qeeT',
		price: 400,
		image:
			'https://images.unsplash.com/photo-1574226516831-e1dff420e562?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=225&q=80',
		attribution: 'Photo by Priscilla Du Preez on Unsplash',
		currency: 'USD',
	},
	{
		name: 'Tangerines',
		id: 'sku_GBJ2WWfMaGNC2Z',
		price: 100,
		image:
			'https://images.unsplash.com/photo-1482012792084-a0c3725f289f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=225&q=80',
		attribution: 'Photo by Jonathan Pielmayer on Unsplash',
		currency: 'USD',
	},
]
export default async function handler(req, res) {
	if (req.method === 'POST') {
		console.log('ur here')
		try {
			// const line_items = await validateCartItems(
			// 	inventory,
			// 	{
			// 		name: 'Tangerines',
			// 		id: 'sku_GBJ2WWfMaGNC2Z',
			// 		price: 100,
			// 		image:
			// 			'https://images.unsplash.com/photo-1482012792084-a0c3725f289f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=225&q=80',
			// 		attribution: 'Photo by Jonathan Pielmayer on Unsplash',
			// 		currency: 'USD',
			// 	},

			// 	{
			// 		name: 'Bananas',
			// 		description: 'Yummy yellow fruit',
			// 		id: 'sku_GBJ2Ep8246qeeT',
			// 		price: 400,
			// 		image:
			// 			'https://images.unsplash.com/photo-1574226516831-e1dff420e562?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=225&q=80',
			// 		attribution: 'Photo by Priscilla Du Preez on Unsplash',
			// 		currency: 'USD',
			// 	}
			// )
			const params = {
				submit_type: 'pay',
				payment_method_types: ['card'],
				billing_address_collection: 'auto',
				shipping_address_collection: {
					allowed_countries: ['US', 'CA'],
				},
				line_items: [
					{
						quantity: 1,
						price: 'price_1LHMVIHFFw3ZIEqv4zXNFN4k',
					},
				],
				success_url: `http://localhost:3000/result?session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `http://localhost:3000/`,
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
