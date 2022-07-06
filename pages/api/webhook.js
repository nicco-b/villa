import initStripe from 'stripe'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27',
})
import { buffer } from 'micro'
// import products from './products.json'
export const config = {
	api: {
		bodyParser: false,
	},
}
export default async function handler(req, res) {
	console.log('why')
	const stripe = initStripe(process.env.STRIPE_SECRET_KEY)
	const signature = req.headers['stripe-signature']
	const signingSecret = 'whsec_304b21a50db4d65a9eb3d2623be85f09151ca9f885aa99409e344c186313dcf4'
	const reqBuffer = await buffer(req)
	let event

	try {
		event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret)
	} catch (error) {
		console.log({ error })
		return res.status(400).send(`Webhook error: ${error.message}`)
	}

	if (event.type === 'checkout.session.completed') {
		console.log('checkout.session.completed')
		console.log(event)
	}

	res.send({ received: true })
	// Return a 200 response to acknowledge receipt of the event
}
