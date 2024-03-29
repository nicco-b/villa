import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import MainLayout from '../../../components/layouts/MainLayout'
import { useRouter } from 'next/router'
import { Product } from '../../../components/products/product'
import { getProductById } from '../../api/products/[id]'
import useSWR, { SWRConfig, unstable_serialize } from 'swr'
import { getScheduledSales } from '../../api/schedule'
import { getProducts } from '../../api/products/products'
import { useShoppingCart } from '../../../context/ShoppingCartContext'

export async function getStaticPaths() {
	const scheduled_sales = await getScheduledSales()
	//
	const products = await getProducts()
	const ss = JSON.parse(JSON.stringify(scheduled_sales))
	const all_s_products = ss.map(sale => sale?.included_products)?.flat()
	const prods = [...products, ...all_s_products]
	const paths = prods.map(product => {
		if (product._id) {
			return { params: { id: product?._id } }
		}
	})

	return {
		paths,
		fallback: 'blocking',
	}
}
export async function getStaticProps({ params }) {
	const product = await getProductById(params.id)
	if (!product) {
		return {
			notFound: true,
		}
	}
	return {
		props: {
			fallback: {
				// unstable_serialize() array style key
				[unstable_serialize(['/api/products', params.id])]: product,
			},
		},

		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At most once every 10 seconds
		// In seconds
	}
}
export default function SingleProduct({ fallback }) {
	// if (error) return <div>Failed to load</div>
	// if (!data) return <div>Loading...</div>
	// console log first object in fallback object
	const data = fallback[Object.keys(fallback)[0]]
	const title = `${data?.name} | luns shop`

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name='description' content='luns shop' />
				<meta name='theme-color' content='var(--bg)' />

				<link rel='icon' href='/favicon.ico' />
			</Head>
			<SWRConfig
				value={{
					fallback,
				}}>
				<div>
					<ProductPage />
				</div>
			</SWRConfig>
		</>
	)
}

const fetcher = (...args) => fetch(...args).then(res => res.json())

export const ProductPage = () => {
	const router = useRouter()
	const { getItemQuantity } = useShoppingCart()
	console.log(getItemQuantity(router.query.id))
	const id = router.query.id
	const { data, error, isValidating } = useSWR(['/api/products', id], fetcher)
	// console.log({ data, error, isValidating, id })

	return (
		<>
			<div
				style={{
					padding: '1em',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
				<Link href={`/`}>
					<button type='button'>back</button>
				</Link>
				{isValidating && <Image src={'/red_loader.webp'} width={25} height={25} />}
			</div>
			<Product product={data} isValidating={isValidating} />
			<div
				style={{
					padding: '1em',
				}}>
				{data?.description}
			</div>
		</>
	)
}
SingleProduct.getLayout = function getLayout(page) {
	return <MainLayout>{page}</MainLayout>
}
// export async function getServerSideProps(context) {
// 	// Fetch data from external API
// 	const id = context.params.id
// 	console.log(id)
// 	const dev = process.env.NODE_ENV !== 'production'

// 	const res = await fetch(
// 		`${dev ? 'http://' : 'https://'}${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products/${id}`
// 	)

// 	const product = await res.json()

// 	// Pass data to the page via props
// 	return { props: { product } }
// }
