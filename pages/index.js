import Head from 'next/head'
import Image from 'next/image'
import { SWRConfig } from 'swr'
import MainLayout from '../components/layouts/MainLayout'
import styles from '../styles/Home.module.css'
import { getProducts } from './api/products/products'
import Home from './home'

export default function Index({ fallback }) {
	return (
		<SWRConfig
			value={{
				fallback,
				revalidate: true,
				revalidateOnFocus: true,
				fetcher: (...args) => fetch(...args).then(res => res.json()),
			}}>
			<Home />
		</SWRConfig>
	)
}

Index.getLayout = function getLayout(page) {
	return <MainLayout>{page}</MainLayout>
}
export async function getStaticProps() {
	// Fetch data from external API
	// const dev = process.env.NODE_ENV !== 'production'

	// const res = await fetch(
	// 	`${dev ? 'http://' : 'https://'}${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products/products`
	// )

	const products = await getProducts()
	console.log({ products })
	// Pass data to the page via props
	return {
		props: {
			fallback: {
				'/api/products/products': products,
			},
		},
		// In seconds
		revalidate: 10,
	}
}
