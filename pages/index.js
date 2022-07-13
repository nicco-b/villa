import Head from 'next/head'
import Image from 'next/image'
import { SWRConfig } from 'swr'
import MainLayout from '../components/layouts/MainLayout'
import styles from '../styles/Home.module.css'
import products, { getProducts } from './api/products/products'
import Home from './home'

export default function Index({ products }) {
	return (
		// <SWRConfig
		// 	value={{
		// 		fallback,
		// 		revalidate: false,
		// 		revalidateOnFocus: false,

		// 		fetcher: (...args) => fetch(...args).then(res => res.json()),
		// 	}}>
		<Home products={products} />
		// </SWRConfig>
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
			products: products,
		},
		// In seconds
		revalidate: 1,
	}
}
