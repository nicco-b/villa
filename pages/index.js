import Head from 'next/head'
import Image from 'next/image'
import MainLayout from '../components/layouts/MainLayout'
import styles from '../styles/Home.module.css'
import Home from './home'

export default function Index({ data }) {
	return <Home data={data} />
}

Index.getLayout = function getLayout(page) {
	return <MainLayout>{page}</MainLayout>
}
export async function getServerSideProps() {
	// Fetch data from external API
	const res = await fetch(`http://localhost:3000/api/products/products`)

	const data = await res.json()

	// Pass data to the page via props
	return { props: { data } }
}
