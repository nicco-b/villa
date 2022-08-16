const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27',
})
import { ObjectId } from 'mongodb'
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
		//for each variant in the cart, check inventory and max allowed

		const orderWithDate = {
			...order,

			session: '',
			customer_details: {
				name: '',
				email: '',
				phone: '',
				tax_exempt: '',
				tax_ids: [],
				address: {
					city: '',
					country: '',
					line1: '',
					line2: '',
					postal_code: '',
					state: '',
				},
			},
			tracking: {
				url: '',
				email_sent: false,
				tracking_number: '',
			},
			shipping_label: '',
			notes: '',
			shipping: {
				address: {
					city: '',
					country: '',
					line1: '',
					line2: '',
					postal_code: '',
					state: '',
				},
				name: '',
			},
			status: 'created',
			status_history: [
				{
					status: 'created',
					date: new Date(),
				},
			],
			created_at: new Date(),
			updated_at: '',
			completed_at: '',
		}

		const newOrder = await db.collection('orders').insertOne(orderWithDate)
		const { insertedId } = newOrder
		const params = {
			submit_type: 'pay',
			payment_method_types: ['card'],
			billing_address_collection: 'auto',
			shipping_address_collection: {
				allowed_countries: [
					'AR',
					'AM',
					'AU',
					'AT',
					'BS',
					'BB',
					'BE',
					'BR',
					'BG',
					'CA',
					'CL',
					'CN',
					'CO',
					'CR',
					'DK',
					'DO',
					'EG',
					'EC',
					'FI',
					'FR',
					'GE',
					'DE',
					'GR',
					'GT',
					'GL',
					'HK',
					'HU',
					'IS',
					'IN',
					'ID',
					'IE',
					'IT',
					'JP',
					'JM',
					'JO',
					'KR',
					'KW',
					'LA',
					'LB',
					'LU',
					'MY',
					'MV',
					'MX',
					'MC',
					'MN',
					'NP',
					'NL',
					'NZ',
					'NO',
					'PA',
					'PE',
					'PH',
					'PL',
					'PT',
					'QA',
					'PR',
					'RO',
					'MK',
					'SG',
					'SK',
					'SI',
					'ZA',
					'ES',
					'SE',
					'CH',
					'TW',
					'TH',
					'TR',
					'AE',
					'GB',
					'US',
					'VN',
				],
			},
			phone_number_collection: {
				enabled: true,
			},
			line_items: p,
			success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${req.headers.origin}/`,
			mode: 'payment',
			client_reference_id: `${insertedId}`,
		}
		const session = await stripe.checkout.sessions.create(params)

		console.log('o', { order })
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
