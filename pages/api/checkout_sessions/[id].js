import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
	const id = req.query.id
	console.log('completed order: ', id)
	try {
		if (!id.startsWith('cs_')) {
			throw Error('Incorrect CheckoutSession ID.')
		}
		const checkout_session = await stripe.checkout.sessions.retrieve(id)
		//get order from database
		res.status(200).json(checkout_session)
	} catch (err) {
		res.status(500).json({ statusCode: 500, message: err.message })
	}
}
