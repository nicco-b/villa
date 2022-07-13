import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import MainLayout from '../../../components/layouts/MainLayout'
import styles from '../../../styles/Home.module.css'
import { useRouter } from 'next/router'
import { Product } from '../../../components/products/product'
import { getProducts } from '../../api/products/products'
import { getProductById } from '../../api/products/[id]'
import useSWR, { SWRConfig, unstable_serialize } from 'swr'
import axios from 'axios'
export default function SingleProduct({ fallback }) {
	// if (error) return <div>Failed to load</div>
	// if (!data) return <div>Loading...</div>
	// console log first object in fallback object
	const data = fallback[Object.keys(fallback)[0]]
	const title = `${data?.name} | luns shop`

	return (
		<SWRConfig
			value={{
				fallback,
				revalidate: false,
				revalidateOnFocus: false,
				fetcher: (...args) => fetch(...args).then(res => res.json()),
			}}>
			<div>
				<Head>
					<title>{title}</title>
					<meta name='description' content='Generated by create next app' />
					<meta name='theme-color' content='var(--bg)' />

					<link rel='icon' href='/favicon.ico' />
				</Head>
				<ProductPage />
			</div>
		</SWRConfig>
	)
}

const fetcher = (url, id) => axios.get(`${url}/${id}`, {}).then(res => res.data)

const ProductPage = () => {
	const router = useRouter()
	const { id } = router.query
	const { data, error, isValidating } = useSWR(
		['/api/products', id],
		(url, id) => fetcher(url, id),
		{
			refreshInterval: 1000,
		}
	)
	console.log({ data, error, isValidating, id })

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
					<button type='text'>back</button>
				</Link>
				{isValidating && <Image src={'/REDloader.gif'} width={25} height={25} />}
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
export async function getStaticPaths() {
	const data = await getProducts()
	const paths = data.map(product => ({
		params: { id: product.id },
	}))

	// We'll pre-render only these paths at build time.
	// { fallback: blocking } will server-render pages
	// on-demand if the path doesn't exist.
	return {
		paths,
		fallback: 'blocking',
	}
}
export async function getStaticProps({ params }) {
	console.log('running getStaticProps, params', params)
	const product = await getProductById(params.id)
	console.log(product)
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
		revalidate: 1, // In seconds
	}
}
