import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import useSWR from 'swr'
import MainLayout from '../../components/layouts/MainLayout'
import { Products } from '../../components/products'
import styles from '../../styles/Home.module.css'
const fetcher = null
export default function Home() {
	const { data, isValidating } = useSWR('/api/products/products', fetcher)
	return (
		<div className={styles.container}>
			<Head>
				<title>luns shop</title>
				<meta name='description' content='Generated by create next app' />
				{/* theme color meta tag */}
				<meta name='theme-color' content='var(--bg)' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div className={styles.main}>
				<div
					style={{
						height: '100%',
						display: 'grid',
						padding: '1em',
					}}>
					<Products products={data} isValidating={isValidating} />
				</div>
			</div>
		</div>
	)
}

Home.getLayout = function getLayout(page) {
	return <MainLayout>{page}</MainLayout>
}
// export async function getServerSideProps() {
// 	// Fetch data from external API
// 	const res = await fetch(`${process.env.VERCEL_URL}/api/products`)
// 	const data = await res.json()

// 	// Pass data to the page via props
// 	return { props: { data } }
// }
