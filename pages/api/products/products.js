// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27',
})
import { products } from './productList'
import { connectToDatabase } from '../../../utils/mongodb'

export async function getProducts(req, res) {
	// const data = await stripe.products.list({
	// 	expand: ['data.default_price'],
	// 	// limit: 3,
	// })
	// const productsWithPrices = await stripe.prices.list({
	// 	limit: 3,
	// 	expand: ['data.product'],
	// })
	// console.log(productsWithPrices)

	// const price = await stripe.prices.retrieve('prod_LzyBdOkrkQPayl')
	const { db } = await connectToDatabase()
	const data = await db.collection('products').find({}).toArray()
	// console.log({ order }
	const p = JSON.parse(JSON.stringify(data))

	// console.log(p)
	return p
}
export default async (req, res) => {
	const products = await getProducts()
	await res.revalidate(`/api/products/products`)

	res.status(200).json(products)
}
