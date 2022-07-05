// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27',
})
// import products from './products.json'

export default async function handler(req, res) {
	const products = await stripe.products.list({
		expand: ['data.default_price'],
		limit: 3,
	})
	// get stripe price from each products price_id
	// const productsWithPrices = await stripe.prices.list({
	// 	limit: 3,
	// 	expand: ['data.product'],
	// })
	// console.log(productsWithPrices)

	// const price = await stripe.prices.retrieve('prod_LzyBdOkrkQPayl')

	// console.log(price)
	res.status(200).json(products)
}
