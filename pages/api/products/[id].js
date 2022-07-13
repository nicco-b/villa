// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
	const data = await db.collection('products').findOne({ id: id })
	// console.log({ order }
	const product = JSON.parse(JSON.stringify(data))
	// const product = products.find(product => product.id == id)
	// const p = products.find(product => product.id === id)
	// console.log({ p })
	return product
}
export default async (req, res) => {
	const { id } = req.query
	await res.revalidate(`/products/${id}`)
	const product = await getProductById(id)
	console.log({ product })

	res.status(200).json(product)
}
