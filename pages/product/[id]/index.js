import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import MainLayout from '../../../components/layouts/MainLayout'
import styles from '../../../styles/Home.module.css'
import { useRouter } from 'next/router'
import { Product } from '../../../components/products/product'
import { getProducts } from '../../api/products/products'
export default function SingleProduct({ product }) {
	const title = `${product.name} | luns shop`
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='theme-color' content='var(--bg)' />

				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div
				style={{
					padding: '1em',
				}}>
				<Link href={`/`}>
					<button type='text'>back</button>
				</Link>
			</div>
			<Product product={product} />
			<div
				style={{
					padding: '1em',
				}}>
				{product.description}
			</div>
		</div>
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
	return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
	const id = params.id
	console.log(id)
	const dev = process.env.NODE_ENV !== 'production'

	const res = await fetch(
		`${dev ? 'http://' : 'https://'}${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products/${id}`
	)
	const product = await res.json()

	return {
		props: {
			product,
		},
		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At most once every 10 seconds
		// revalidate: 120, // In seconds
	}
}
