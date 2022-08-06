import { connectToDatabase } from '../../../utils/mongodb'

export async function getProducts(req, res) {
	const { db } = await connectToDatabase()
	const collection = db.collection('products')
	// const data = await db
	// 	.collection('products')
	// 	.find({
	// 		'status.published': true,
	// 		'status.schedule_id': '',
	// 	})
	// 	.toArray()
	const agg = [
		{
			$match: {
				'status.published': true,
				'status.schedule_id': '',
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
				let: {
					pid: '$pid',
				},
				pipeline: [
					{
						$match: {
							$expr: {
								$eq: ['$product_id', '$$pid'],
							},
						},
					},
				],
				as: 'variants',
			},
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

		{
			$unset: ['pid', 'status_history'],
		},
	]
	const data = await collection.aggregate(agg).toArray()
	// console.log({ order }
	const p = JSON.parse(JSON.stringify(data))

	// console.log(p)
	return p
}
export default async (req, res) => {
	const products = await getProducts()

	res.status(200).json(products)
}
