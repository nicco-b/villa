import { ObjectId } from 'mongodb'

import { createRouter } from 'next-connect'
import { connectToDatabase } from '../../../utils/mongodb'
import { getProductById } from '../products/[id]'

// Default Req and Res are IncomingMessage and ServerResponse
// You may want to pass in NextApiRequest and NextApiResponse
const router = createRouter()

router.post(async (req, res) => {
	const id = req.body.id
	const variant_id = req.body.vid
	const quantity = req.body.q
	console.log({ id, quantity })
	try {
		//get order from database
		// console.log('completed order: ', id)

		// const { db } = await connectToDatabase()

		// const order = await db
		// 	.collection('orders')
		// 	.findOne(ObjectId(checkout_session.client_reference_id))
		// // console.log({ order }
		const product = await getProductById(id)
		// compare quantity to inventory
		// if quantity > inventory, throw error
		console.log({ product })
		//filter products.variants to find variant_id
		const variant = product.variants.find(variant => variant._id === variant_id)
		console.log({ variant })
		res.status(200).json({ ...variant })
		// const ee = data.inventory - quantity
		// console.log(ee)
		// if (ee === 0 || data['max-allowed'] <= quantity) {
		// 	console.log(ee)
		// 	res.status(400).json({ message: 'maximum', inventory: data.inventory })
		// } else if (data.inventory === 0) {
		// 	res.status(400).json({ message: 'no stock', inventory: data.inventory })
		// } else {
		// 	res.status(200).json({ message: 'added!', inventory: data.inventory })
		// }
	} catch (err) {
		res.status(500).json({ statusCode: 500, message: 'svr err', serverMessage: err.message })
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
