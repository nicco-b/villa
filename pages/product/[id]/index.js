import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import MainLayout from '../../../components/layouts/MainLayout'
import styles from '../../../styles/Home.module.css'
import { useRouter } from 'next/router'
import { Product } from '../../../components/products/product'
export default function SingleProduct({ product }) {
	return (
		<div>
			<Head>
				<title>{product.name} | luns shop</title>
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
export async function getServerSideProps(context) {
	// Fetch data from external API
	const id = context.params.id
	console.log(id)
	const dev = process.env.NODE_ENV !== 'production'

	const res = await fetch(
		`${dev ? 'http://' : 'https://'}${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products/${id}`
	)

	const product = await res.json()

	// Pass data to the page via props
	return { props: { product } }
}
