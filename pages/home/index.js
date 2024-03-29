import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import MainLayout from '../../components/layouts/MainLayout'
import { Products } from '../../components/products'
import styles from '../../styles/Home.module.css'
import { CountDown, CountdownTimer } from './Countdown'
import { LogoHoverSwap } from '../../components/topbar'
const fetcher = () => axios.get('/api/schedule').then(res => res.data)
const fetcher2 = () => axios.get('/api/products/products').then(res => res.data)

export default function Home() {
	const { mutate } = useSWRConfig()
	const { data, isValidating } = useSWR('/api/products/products', fetcher2)
	const { data: scheduled_sales, isValidating: scheduleValidating } = useSWR(
		'/api/schedule',
		fetcher
	)
	const [countdownFinished, setCountdownFinished] = useState(false)
	useEffect(() => {
		if (countdownFinished) {
			//fetch scheduled_sales
			console.log('fetching sales')
			mutate('/api/schedule', fetcher, false)
		}
	}, [countdownFinished])

	return (
		<>
			<Head>
				<title>luns shop</title>
				<meta name='description' content='luns shop' />
				{/* theme color meta tag */}
				<meta name='theme-color' content='var(--bg)' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className={styles.container}>
				<>
					<div
						style={{
							width: '100%',
							height: '100%',
							display: 'grid',
							padding: '1em',
						}}>
						<>
							{/* <LogoHoverSwap animate={false} /> */}

							{isValidating && scheduleValidating && (
								<div
									style={{
										display: 'flex',
										// height: '55px',/
										width: '100%',
										justifyContent: 'center',
										position: 'relative',
										zIndex: '2',
										// backgroundColor: '#f5f5f5',
									}}>
									<div
										style={{
											// top: '-50px',
											position: 'absolute',
										}}>
										<Image src={'/red_loader.webp'} alt='loading' width={55} height={55} />
									</div>
								</div>
							)}
							{scheduled_sales && (
								<>
									{scheduled_sales.map((sale, index) => {
										return (
											<>
												<div
													key={sale._id}
													style={{
														display: 'flex',
														flexDirection: 'column',
														lineHeight: '1.5',
														padding: countdownFinished ? '0' : '0 0 1em 0',
													}}>
													<CountdownTimer
														date={sale.start_date}
														setCountdownFinished={setCountdownFinished}
														sale={sale}
													/>
												</div>

												<Products
													products={sale?.included_products?.length > 0 ? sale.included_products : []}
													isValidating={scheduleValidating}
												/>
												{sale?.included_products.map((s, i) => {
													return (
														data?.length > 0 &&
														sale?.included_products?.length - 1 === i && (
															<div
																style={{
																	margin: ' 1.5em 0 1.5em 0',
																	height: '1px',
																	backgroundColor: 'var(--border-color-alt)',
																}}></div>
														)
													)
												})}
											</>
										)
									})}
								</>
							)}

							<Products products={data} isValidating={isValidating} />
						</>
					</div>
				</>
			</div>
		</>
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
