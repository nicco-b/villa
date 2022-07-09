// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import products from './productList'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27',
})

export async function getProductById(id) {
	const product = await stripe.products.retrieve(id, {
		expand: ['default_price'],
	})
	// const p = products.find(product => product.id === id)
	// console.log({ p })
	return product
}
export default async (req, res) => {
	const { id } = req.query

	const products = await getProductById(id)
	res.status(200).json(products)
}
