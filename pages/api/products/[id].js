// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import products from './products.json'
export default function handler(req, res) {
	console.log({ products })
	const { id } = req.query
	const p = products.find(product => product.id === id)
	console.log({ p })
	res.status(200).json(p)
}
