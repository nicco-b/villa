import Stripe from 'stripe'
import { ObjectId } from 'mongodb'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
import { createRouter } from 'next-connect'
import { connectToDatabase } from '../../../utils/mongodb'

// Default Req and Res are IncomingMessage and ServerResponse
// You may want to pass in NextApiRequest and NextApiResponse
const router = createRouter()

router.get(async (req, res) => {
	const id = req.query.id
	try {
		const checkout_session = await stripe.checkout.sessions.retrieve(id)
		//get order from database
		// console.log('completed order: ', id)

		const { db } = await connectToDatabase()
		const session = checkout_session
		const order = await db
			.collection('orders')
			.findOne(ObjectId(checkout_session.client_reference_id))
		// console.log({ order })
		res.status(200).json({ session, order })
	} catch (err) {
		res.status(500).json({ statusCode: 500, message: err.message })
	}
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
