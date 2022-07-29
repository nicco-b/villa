import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'
import { connectToDb } from '../../../lib/mongodb'
import { getToken } from 'next-auth/jwt'
import { ObjectId } from 'mongodb'

// Default Req and Res are IncomingMessage and ServerResponse
// You may want to pass in NextApiRequest and NextApiResponse
const router = createRouter()

export const getScheduledSale = async id => {
	const { db } = await connectToDb()
	const collection = db.collection('scheduled_sales')
	// const scheduled_sale = await db.collection('scheduled_sales').findOne({
	// 	_id: new ObjectId(id),
	// })
	const agg = [
		{
			$match: {
				_id: new ObjectId(id),
			},
		},
		{
			$lookup: {
				from: 'products',
				let: {
					id: '$_id',
				},
				pipeline: [
					{
						$match: {
							$expr: {
								$eq: [
									{
										$convert: {
											input: '$status.schedule_id',
											to: 'objectId',
											onError: '',
											onNull: '',
										},
									},
									'$$id',
								],
							},
						},
					},
				],
				as: 'included_products',
			},
		},
	]
	const scheduled_sale = await collection.aggregate(agg).toArray()
	console.log(scheduled_sale)
	return scheduled_sale[0]
}
router.get(async (req, res) => {
	const token = await getToken({ req })
	const { id } = req.query
	if (token && req.method === 'GET') {
		const scheduled_sale = await getScheduledSale(id)
		res.status(200).json(scheduled_sale)
	} else {
		res.setHeader('Allow', 'POST')
		res.status(405).end('Method Not Allowed')
	}
})
router.put(async (req, res) => {
	const { db } = await connectToDb()
	const token = await getToken({ req })
	const { _id, ...rest } = req.body
	const id = _id
	console.log(id)
	if (token && req.method === 'PUT') {
		const collection = db.collection('scheduled_sales')
		//try to update
		try {
			const p = await collection.findOneAndUpdate(
				{ _id: ObjectId(id) },
				{
					$set: rest,
				},
				{ returnDocument: 'after' }
			)
			res.status(200).json(p)
		} catch (err) {
			console.log(err)
			if (err.codeName === 'DuplicateKey') {
				res.status(400).end('Duplicate')
			}
			res.status(400).end(err.message)
		}
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
