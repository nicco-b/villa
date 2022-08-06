import { ObjectId } from 'mongodb'
import { connectToDatabase } from '../../../utils/mongodb'

export async function getProductById(id) {
	const { db } = await connectToDatabase()
	const collection = db.collection('products')

	console.log('wtf', id)
	if (id !== 'undefined') {
		const agg = [
			{
				$match: {
					_id: ObjectId(id),
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
		const product = JSON.parse(JSON.stringify(data))

		return product[0]
	}
}
export default async (req, res) => {
	const { id } = req.query
	if (id) {
		const getProductById = async id => {
			const { db } = await connectToDatabase()
			const collection = db.collection('products')

			console.log('wtf', id)
			if (id !== 'undefined') {
				const agg = [
					{
						$match: {
							_id: ObjectId(id),
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
				const product = JSON.parse(JSON.stringify(data))

				return product[0]
			}
		}
		const product = await getProductById(id)

		res.status(200).json(product)
	}
}
