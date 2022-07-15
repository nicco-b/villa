import initStripe from 'stripe'

// import fs from 'fs'
import { ObjectId } from 'mongodb'
import { buffer } from 'micro'
// import products from './products.json'
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
const transporter = nodemailer.createTransport({
	port: 465, // true for 465, false for other ports
	host: 'smtp.gmail.com',
	auth: {
		user: 'njbufalino@gmail.com',
		pass: 'thlwovicmktyosmi',
	},
	secure: true,
})

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
	console.log(event.type)

	if (event.type === 'checkout.session.completed') {
		console.log('checkout.session.completed')
		await res.revalidate(`/`)

		//update order
		console.log('update order here', event)
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

		const orderDoc = await db.collection('orders').findOneAndUpdate(
			{
				_id: ObjectId(client_reference_id),
			},
			updateDoc
		)
		console.log('orderDoc', orderDoc)
		//

		//get products from updated order and update the inventory
		const { products } = orderDoc.value
		await products.map(p => {
			res.revalidate(`/product/${p.id}`)

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
		//
		//send email to customer

		const email = new Email({
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
		// const mailData = {
		// 	from: '"Luns Shop" <njbufalino@gmail.com>', // sender address
		// 	to: customer_details.email, // list of receivers
		// 	subject: 'Order Successful', // Subject line
		// 	text: 'order',
		// 	html: htmlTemplate, // plain text body
		// }
		// transporter.sendMail(mailData, function (err, info) {
		// 	if (err) console.log(err)
		// 	else console.log(info)
		// })
		const dir = path.join(process.cwd(), 'templates', 'order-success')
		//public folder
		const publicFolder = path.join(process.cwd(), 'public')
		const templ = dir

		await email.send({
			template: templ,
			message: {
				// from: 'njbufalino@gmail.com', // sender address
				to: customer_details.email, // list of receivers
				// subject: 'Order Successful', // Subject line
				// text: 'order',
				// html: htmlTemplate, // plain text body
			},
			send: true,
		})
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
