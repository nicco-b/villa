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
	try {
		const product = await getProductById(id)
		const { variants, ...rest } = product
		console.log({ product })
		const variant = product.variants.find(variant => variant._id === variant_id)
		console.log({ variant })
		const variant_name = variant?.attributes && Object.values(variant.attributes).join(',')
		console.log({ quantity }, product.max_allowed)

		if (quantity < product.max_allowed) {
			res.status(200).json({ ...rest, ...variant, variant_name, message: 'added', quantity })
		} else if (quantity >= rest.max_allowed) {
			res.status(404).json({ ...rest, ...variant, variant_name, message: 'maximum', quantity })
		}
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
