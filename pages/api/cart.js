const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27',
})

export default async function handler(req, res) {
	const ids = req.query.ids.split(',')
	console.log(ids)
	const products = await stripe.products.list({
		expand: ['data.default_price'],
		ids: ids,
	})
	// get stripe price from each products price_id
	// const productsWithPrices = await stripe.prices.list({
	// 	limit: 3,
	// 	expand: ['data.product'],
	// })
	// console.log(productsWithPrices)

	// const price = await stripe.prices.retrieve('prod_LzyBdOkrkQPayl')

	// console.log(price)
	if (products) res.status(200).json([])
	else res.status(404).json({ message: 'Error' })
}
