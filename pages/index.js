import Head from 'next/head'
import Image from 'next/image'
import MainLayout from '../components/layouts/MainLayout'
import styles from '../styles/Home.module.css'
import Home from './home'

export default function Index({ data }) {
	const env = process.env.NEXT_PUBLIC_VERCEL_URL
	console.log(env)
	return <Home data={data} />
}

Index.getLayout = function getLayout(page) {
	return <MainLayout>{page}</MainLayout>
}
export async function getServerSideProps() {
	// Fetch data from external API
	const dev = process.env.NODE_ENV !== 'production'

	const res = await fetch(
		`${dev ? 'http://' : 'https://'}${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products/products`
	)

	const { products } = await res.json()
	const { data } = products
	// Pass data to the page via props
	return { props: { data: `${data.products}` } }
}
