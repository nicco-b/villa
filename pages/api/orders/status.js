import { connectToDatabase } from '../../../utils/mongodb'
import { createRouter } from 'next-connect'
import { ObjectId } from 'mongodb'

// Default Req and Res are IncomingMessage and ServerResponse
// You may want to pass in NextApiRequest and NextApiResponse
const router = createRouter()
export const getOrderStatus = async ({ id, email }) => {
	const { db } = await connectToDatabase()
	console.log(id, email)
	const order = await db
		.collection('orders')
		.findOne({ _id: ObjectId(id), 'customer_details.email': email })
	return order
}

router.get(async (req, res) => {
	const { db } = await connectToDatabase()

	const order = await db.collection('orders').findOne(req.query.id)
	res.status(200).json(order)
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
