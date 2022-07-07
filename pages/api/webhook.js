import initStripe from 'stripe'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27',
})
import { ObjectId } from 'mongodb'
import { buffer } from 'micro'
// import products from './products.json'
export const config = {
	api: {
		bodyParser: false,
	},
}
import { createRouter } from 'next-connect'
import { connectToDatabase } from '../../utils/mongodb'
import { imageOptimizer } from 'next/dist/server/image-optimizer'

// Default Req and Res are IncomingMessage and ServerResponse
// You may want to pass in NextApiRequest and NextApiResponse
const router = createRouter()

router.post(async (req, res) => {
	console.log('why', req.rawBody)
	const stripe = initStripe(process.env.STRIPE_SECRET_KEY)
	const signature = req.headers['stripe-signature']
	const signingSecret = process.env.STRIPE_WHSEC
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
		//update order
		console.log('update order here')
		const { db } = await connectToDatabase()
		const { object } = event.data
		const { client_reference_id, customer_details, shipping } = object
		const updateDoc = {
			$set: {
				customer_details: customer_details,
				shipping: shipping,
				shipping: shipping,
				updated_at: new Date(),
			},
		}
		const options = { upsert: false }
		const newOrder = await db.collection('orders').updateOne(
			{
				_id: ObjectId(client_reference_id),
			},
			updateDoc,
			options
		)
		console.log(client_reference_id, newOrder)
	}
	console.log(event.type)
	res.send({ received: true })
	// Return a 200 response to acknowledge receipt of the event
})
export default router.handler({
	onError: (err, req, res) => {
		console.error(err.stack)
		res.status(500).end('Something broke!')
	},
	onNoMatch: (req, res) => {
		res.status(404).end('Page is not found')
	},
})
