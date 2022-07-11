import initStripe from 'stripe'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27',
})
// import fs from 'fs'
import { ObjectId } from 'mongodb'
import { buffer } from 'micro'
// import products from './products.json'
export const config = {
	api: {
		bodyParser: false,
	},
}
import ejs from 'ejs'
import { createRouter } from 'next-connect'
import { connectToDatabase } from '../../../utils/mongodb'
import { dirname } from 'path'
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
		products.map(p => {
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
		const htmlTemplate = `
		<div style="max-width: 600px; max-height: auto;
		overflow: hidden; 
		background-color:#F6F2E580;
		color: #2b2b2c;
		border: 1px dashed #C2B99E80;
		font-family: 'Inter', sans-serif;
 padding: 20px">
 <div><span>Luns Shop Order:</span></div>
 <br/>

<ul style="
borderBottom: 1px dashed #C2B99E80;
list-style-type: none;
width: auto;
padding: 0;
margin: 0;
overflow: hidden;">
 <li style="
width: 100%;
overflow: hidden;">
<span style="
width: 50%;
float: left;
overflow: hidden;">${customer_details.name}</span>
<span style="
width: 50%;
float: left;
overflow: hidden;">#${orderDoc.value._id}</span>
</li>
</ul>
<br/>
<ul style="
list-style-type: none;
width: auto;
padding: 0;
margin: 0;
overflow: hidden;">
 <li style="
width: 100%;
overflow: hidden;">
<span style="
width: 50%;
float: left;
overflow: hidden;">order summary</span>
<span style="
width: 50%;
float: left;
overflow: hidden;">1 item</span>
</li>
</ul>
 <br/>
 </div>
 `
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
					products: products,
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
