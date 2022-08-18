import { connectToDatabase } from '../../../utils/mongodb'
import { createRouter } from 'next-connect'
import { ObjectId } from 'mongodb'

// Default Req and Res are IncomingMessage and ServerResponse
// You may want to pass in NextApiRequest and NextApiResponse
const router = createRouter()
export const getOrderStatus = async ({ id, email }) => {
	const { db } = await connectToDatabase()
	console.log(id, email)
	if (id && email) {
		const order = await db
			.collection('orders')
			.findOne({ _id: ObjectId(id), 'customer_details.email': email })
		return order
	}
	return null
}

router.get(async (req, res) => {
	const { db } = await connectToDatabase()

	try {
		const order = await getOrderStatus({
			id: req.query?.id,
			email: req.query?.email,
		})

		if (order) {
			res.status(200).json(order)
		} else {
			res.status(404).json({ message: 'Order not found' })
		}
	} catch (error) {
		res.status(500).json(error)
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
