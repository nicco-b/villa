// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from 'mongodb'
import { connectToDatabase } from '../../../utils/mongodb'
import { products } from './productList'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27',
})

export async function getProductById(id) {
	// const product = await stripe.products.retrieve(id, {
	// 	expand: ['default_price'],
	// })
	const { db } = await connectToDatabase()
	const collection = db.collection('products')
	// const data = await db
	// 	.collection('products')
	// 	.findOne({ _id: ObjectId(id), 'status.published': true })
	// // console.log({ order }
	// console.log('wtf')
	// const product = JSON.parse(JSON.stringify(data))
	// const product = products.find(product => product.id == id)
	// const p = products.find(product => product.id === id)
	// console.log({ p })
	const agg = [
		{
			$match: {
				_id: ObjectId(id),
				'status.published': true,
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
	const product = JSON.parse(JSON.stringify(data))

	return product[0]
}
export default async (req, res) => {
	const { id } = req.query
	const product = await getProductById(id)

	res.status(200).json(product)
}
