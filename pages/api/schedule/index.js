import { createRouter } from 'next-connect'
import { connectToDatabase } from '../../../utils/mongodb'
var moment = require('moment')

// Default Req and Res are IncomingMessage and ServerResponse
// You may want to pass in NextApiRequest and NextApiResponse
const router = createRouter()

router.post(async (req, res) => {
	const { db } = await connectToDatabase()
	if (req.method === 'POST') {
		const orders = await db.collection('scheduled_sales').insertOne(req.body)
		res.status(200).json(orders)
	} else {
		res.setHeader('Allow', 'POST')
		res.status(405).end('Method Not Allowed')
	}
})
export const getScheduledSales = async query => {
	const { db } = await connectToDatabase()
	const scheduled_sales = await db
		.collection('scheduled_sales')
		.aggregate([
			{
				$match: {
					active: true,
					archived: false,
				},
			},

			{
				$lookup: {
					from: 'products',
					let: {
						id: '$_id',
					},
					pipeline: [
						{
							$match: {
								$expr: {
									$eq: [
										{
											$convert: {
												input: '$status.schedule_id',
												to: 'objectId',
												onError: '',
												onNull: '',
											},
										},
										'$$id',
									],
								},
								'status.published': true,
							},
						},
						{
							$addFields: {
								pid: {
									$convert: {
										input: '$_id',
										to: 'string',
										onError: '',
										onNull: '',
									},
								},
							},
						},
						{
							$lookup: {
								from: 'product_variants',
								localField: 'pid',
								foreignField: 'product_id',
								as: 'variants',
							},
						},

						{
							$unset: ['pid', 'status_history'],
						},
						{
							$addFields: {
								variants: {
									//if variants_size is greater than 1 , then dont return variants where is_default is true
									$cond: {
										if: {
											$gt: [{ $size: '$variants' }, 1],
										},
										then: {
											$filter: {
												input: '$variants',
												as: 'variant',
												cond: { $ne: ['$$variant.is_default', true] },
											},
										},
										else: '$variants',
									},
								},
							},
						},
					],
					as: 'included_products',
				},
			},

			{
				$addFields: {
					start_date: {
						$convert: {
							input: '$start_date',
							to: 'date',
							onError: '',
							onNull: '',
						},
					},
				},
			},
			{
				$addFields: {
					start_date: {
						$dateToString: {
							format: '%Y-%m-%dT%H:%M:%S.%LZ',
							date: '$start_date',
							timezone: 'GMT',
						},
					},
					current_date: {
						$dateToString: {
							format: '%Y-%m-%dT%H:%M:%S.%LZ',
							date: new Date(),
						},
					},
				},
			},

			{
				$project: {
					type: '$type',
					start_date: '$start_date',
					end_date: '$end_date',
					title: '$title',
					current_date: '$current_date',
					callout: '$callout',
					included_products: {
						// new field
						$cond: {
							if: { $lt: ['$start_date', '$current_date'] },
							then: '$included_products',
							else: [],
						},
					},
				},
			},
		])
		.toArray()

	return scheduled_sales
}
router.get(async (req, res) => {
	if (req.method === 'GET') {
		const scheduled_sales = await getScheduledSales()
		res.status(200).json(scheduled_sales)
	} else {
		res.setHeader('Allow', 'POST')
		res.status(405).end('Method Not Allowed')
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
