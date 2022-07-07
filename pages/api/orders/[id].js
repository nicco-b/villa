const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27',
})
import { connectToDatabase } from '../../../utils/mongodb'

import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

// Default Req and Res are IncomingMessage and ServerResponse
// You may want to pass in NextApiRequest and NextApiResponse
const router = createRouter()

router.get(async (req, res) => {
	const { db } = await connectToDatabase()

	const order = await db.collection('orders').findOne(req.query.id)
	console.log(order)
	res.status(200).json(order)
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
