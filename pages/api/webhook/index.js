import initStripe from 'stripe'

import { ObjectId } from 'mongodb'
import { buffer } from 'micro'
export const config = {
	api: {
		bodyParser: false,
	},
}
import { createRouter } from 'next-connect'
import { connectToDatabase } from '../../../utils/mongodb'
import { formatCurrencyString } from 'use-shopping-cart'
const nodemailer = require('nodemailer')
const Email = require('email-templates')
const path = require('path')
let aws = require('@aws-sdk/client-ses')
process.env.AWS_ACCESS_KEY_ID = 'AKIA5Q535WPJT3QNTVXY'
process.env.AWS_SECRET_ACCESS_KEY = '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'
const ses = new aws.SES({
	apiVersion: '2010-12-01',
	region: 'us-east-1',
	credentials: {
		accessKeyId: 'AKIA5Q535WPJT3QNTVXY',
		secretAccessKey: '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',
	},
})

// Default Req and Res are IncomingMessage and ServerResponse
// You may want to pass in NextApiRequest and NextApiResponse
const router = createRouter()
let transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: 'njbufalino@gmail.com',
		pass: 'tvnjnymctbhsfukq',
	},
})
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
	console.log(event.type)
	if (event.type === 'checkout.session.expired') {
		console.log('checkout.session.expired')
		//delete the associeted order from the database
		const { object } = event.data
		const { client_reference_id } = object
		const orderId = new ObjectId(client_reference_id)
		//findOneAndDelete
		const { db } = await connectToDatabase()
		const order = await db.collection('orders').findOneAndDelete({ _id: orderId })
		console.log(order)

		return res.status(200).send('checkout.session.expired')
	}
	if (event.type === 'checkout.session.completed') {
		console.log('checkout.session.completed')

		//update order
		console.log('update order here', event)
		const { db } = await connectToDatabase()
		const { object } = event.data
		const { client_reference_id, customer_details, shipping } = object
		const updateDoc = {
			$set: {
				customer_details: customer_details,
				session_id: object.id,
				shipping: shipping,
				shipping: shipping,
				updated_at: new Date(),
				completed_at: new Date(),
				status: 'paid',
			},
			$addToSet: {
				status_history: {
					status: 'paid',
					date: new Date(),
				},
			},
		}
		const orderDoc = await db.collection('orders').findOneAndUpdate(
			{
				_id: ObjectId(client_reference_id),
			},
			updateDoc
		)
		console.log('orderDoc', orderDoc)
		//

		//get products from updated order and update the products inventory
		const { products } = orderDoc.value
		await products.map(p => {
			db.collection('products').findOneAndUpdate(
				{ _id: ObjectId(p._id) },
				{
					$inc: {
						inventory: -p.quantity,
					},
				},
				{ returnNewDocument: true }
			)
		})

		//send email to customer
		const clientTemplate = path.join(process.cwd(), 'templates', 'order-success', 'client')
		console.log('clientTemplate', clientTemplate)
		const customerEmail = new Email({
			from: 'njbufalino@gmail.com',
			message: {
				from: 'njbufalino@gmail.com',
			},
			send: true,
			transport: transporter,
			views: {
				options: {
					extension: 'ejs', // <---- HERE
				},
				locals: {
					name: customer_details.name,
					order: orderDoc.value,
					customer: customer_details,
					shipping: shipping,
					products: products,
					formatPrice: price => {
						formatCurrencyString({
							currency: 'USD',
							value: price,
						})
					},
					date: orderDoc.value.created_at,
				},
			},
		})
		// await transporter.sendMail(
		// 	{
		// 		from: 'njbufalino@gmail.com',
		// 		to: 'njbufalino@gmail.com',
		// 		subject: 'Message',
		// 		text: 'I hope this message gets sent!',
		// 		ses: {
		// 			// optional extra arguments for SendRawEmail
		// 			Tags: [
		// 				{
		// 					Name: 'tag_name',
		// 					Value: 'tag_value',
		// 				},
		// 			],
		// 		},
		// 	},
		// 	(err, info) => {
		// 		console.log(err, info)
		// 	}
		// )

		const t = await customerEmail
			.send({
				template: clientTemplate,
				message: {
					to: 'njbufalino@gmail.com',
				},
			})
			.then(() => {
				console.log('email sent')
			})
			.catch(err => {
				console.log(err)
			})
		console.log({ t })
		//send email to admin
	}
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
