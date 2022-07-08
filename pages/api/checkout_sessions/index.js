const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27',
})
import { createRouter } from 'next-connect'
import { connectToDatabase } from '../../../utils/mongodb'

// Default Req and Res are IncomingMessage and ServerResponse
// You may want to pass in NextApiRequest and NextApiResponse
const router = createRouter()

router.post(async (req, res) => {
	const { formattedProducts, order } = req.body
	const p = formattedProducts
	try {
		// Create Checkout Sessions from body params.
		const { db } = await connectToDatabase()
		const orderWithDate = {
			...order,
			created_at: new Date(),
		}
		const newOrder = await db.collection('orders').insertOne(orderWithDate)
		const { insertedId } = newOrder
		const params = {
			submit_type: 'pay',
			payment_method_types: ['card'],
			billing_address_collection: 'auto',
			// shipping_address_collection: {
			// 	allowed_countries: ['US', 'CA'],
			// },
			line_items: p,
			success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${req.headers.origin}/`,
			mode: 'payment',
			client_reference_id: `${insertedId}`,
		}
		const session = await stripe.checkout.sessions.create(params)
		console.log(session)
		res.status(200).json({ session, order })
	} catch (err) {
		res.status(err.statusCode || 500).json(err.message)
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
