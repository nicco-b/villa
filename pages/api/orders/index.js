const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27',
})
import { connectToDatabase } from '../../../utils/mongodb'

import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

// Default Req and Res are IncomingMessage and ServerResponse
// You may want to pass in NextApiRequest and NextApiResponse
const router = createRouter()

router.post(async (req, res) => {
	const { db } = await connectToDatabase()
	if (req.method === 'POST') {
		// const orders = await db.collection('orders').insertOne(req.body)
		res.status(200).json({})
	} else {
		res.setHeader('Allow', 'POST')
		res.status(405).end('Method Not Allowed')
	}
})
router.get(async (req, res) => {
	const { db } = await connectToDatabase()
	if (req.method === 'GET') {
		const orders = await db.collection('orders').find().toArray()
		console.log(orders)
		res.status(200).json(orders)
	} else {
		res.setHeader('Allow', 'POST')
		res.status(405).end('Method Not Allowed')
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
