// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
	res.status(200).json({
		products: [
			{
				id: 1,
				name: 'fish rug',
				price: '$10.00',
				image: '/product1.png',
				dimensions: '10x10x10',
			},
			{
				id: 2,
				name: 'summer rug',
				price: '$20.00',
				image: '/product2.png',
				dimensions: '10x10x10',
			},
		],
	})
}
