// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27',
})
import { products } from './productList'
import { connectToDatabase } from '../../../utils/mongodb'
import { ObjectId } from 'mongodb'

export async function getProducts(req, res) {
	const { db } = await connectToDatabase()
	const collection = db.collection('products')
	// const data = await db
	// 	.collection('products')
	// 	.find({
	// 		'status.published': true,
	// 		'status.schedule_id': '',
	// 	})
	// 	.toArray()
	const agg = [
		{
			$match: {
				'status.published': true,
				'status.schedule_id': '',
			},
		},
		{
			$addFields: {
				pid: {
					$convert: {
						input: '$_id',
						to: 'string',
						onError: '',
						onNull: '',
					},
				},
			},
		},
		{
			$lookup: {
				from: 'product_variants',
				localField: 'pid',
				foreignField: 'product_id',
				as: 'variants',
			},
		},

		{
			$unset: ['pid', 'status_history'],
		},
	]
	const data = await collection.aggregate(agg).toArray()
	// console.log({ order }
	const p = JSON.parse(JSON.stringify(data))

	// console.log(p)
	return p
}
export default async (req, res) => {
	const products = await getProducts()

	res.status(200).json(products)
}
