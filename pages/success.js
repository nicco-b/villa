import { useEffect } from 'react'
import Head from 'next/head'

import { useShoppingCart } from '../context/ShoppingCartContext'
import axios from 'axios'
import confetti from 'canvas-confetti'
import Link from 'next/link'
import { TopBar } from '../components/topbar'
import LoadingIcon from '../components/utils/LoadingIcon'
import styles from '../styles/Summary.module.css'
import { formatCurrencyString } from 'use-shopping-cart'
import { CartItem } from '../components/cart/cartItem'
export const shootFireworks = () => {
	const duration = 15 * 100
	const animationEnd = Date.now() + duration
	const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

	function randomInRange(min, max) {
		return Math.random() * (max - min) + min
	}

	const interval = setInterval(function () {
		const timeLeft = animationEnd - Date.now()

		if (timeLeft <= 0) {
			return clearInterval(interval)
		}

		const particleCount = 50 * (timeLeft / duration)
		// since particles fall down, start a bit higher than random
		confetti(
			Object.assign({}, defaults, {
				particleCount,
				origin: { x: randomInRange(0.2, 0.4), y: Math.random() - 0.2 },
			})
		)
		confetti(
			Object.assign({}, defaults, {
				particleCount,
				origin: { x: randomInRange(0.6, 0.8), y: Math.random() - 0.2 },
			})
		)
	}, 250)
}
const Success = ({ data }) => {
	// const {
	// 	query: { session_id },
	// } = useRouter()

	const { clearCart } = useShoppingCart()

	// const { data, error } = useSWR(() => `/api/checkout_sessions/${session_id}`, fetcher)
	// console.log({ data, error })

	useEffect(() => {
		if (data.order?.customer_details) {
			shootFireworks()
			clearCart()
		}
	}, [data])
	const title = `order completed | luns shop`

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name='description' content='luns app' />
				<meta name='theme-color' content='var(--bg)' />

				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className={styles.summaryWrapper}>
				<TopBar />
				<div className={styles.summaryBox}>
					<div className={styles.summary}>
						{!data.order ? (
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									paddingTop: '4em',
								}}>
								<img src='/red_loader.webp' alt='loading' width={60} height={60} />
							</div>
						) : (
							data.order?.customer_details && <SuccessInfo data={data.session} order={data.order} />
						)}
					</div>
				</div>
			</div>
		</>
	)
}
export async function getServerSideProps(context) {
	// Fetch data from external API
	const id = context.query.session_id
	console.log(id)
	const dev = process.env.NODE_ENV !== 'production'

	const res = await fetch(
		`${dev ? 'http://' : 'https://'}${process.env.NEXT_PUBLIC_VERCEL_URL}/api/checkout_sessions/${id}`
	)

	const data = await res.json()

	// Pass data to the page via props
	return { props: { data } }
}

export default Success
const SuccessInfo = ({ data, order }) => {
	return (
		<div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					paddingTop: '2em',
					lineHeight: '1.5em',
				}}>
				<h4>Thanks for your order!</h4>
				<span>Check your inbox for the receipt.</span>
				<CompletedOrderSummary data={data} order={order} />

				<Link href={'/'}>
					<button>home</button>
				</Link>
			</div>
		</div>
	)
}

const CompletedOrderSummary = ({ data, order }) => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				padding: '1em 0',
				width: '100%',
				height: '100%',
			}}>
			<div
				style={{
					padding: '1em',
					width: '100%',
					height: '100%',

					border: 'var(--border-style-dashed) var(--border-color)',
				}}>
				<div
					style={{
						fontSize: '1em',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						padding: '1em 0',
						borderBottom: 'var(--border-style-dashed) var(--border-color)',
					}}>
					<div>{order.customer_details.name}</div>
					<div>
						#<b style={{ fontWeight: 'bold' }}>{order._id.slice(-5)}</b>
					</div>
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						padding: '1em 0',
						borderBottom: 'var(--border-style-dashed) var(--border-color)',
					}}>
					<h3>order summary</h3>
					<span>
						{order.cartQuantity > 1 ? `${order.cartQuantity} items` : `${order.cartQuantity} item`}
					</span>
				</div>
				<div
					style={{
						// margin: '0.5em',
						paddingBottom: '1em',

						width: '100%',
						height: '100%',
					}}>
					{order.products.length &&
						order.products.map((product, i) => (
							<div
								style={{
									display: 'grid',
									gridTemplateRows: '1fr auto',
								}}>
								<CartItem key={product.id} product={product}>
									{/* if not last item */}
									<div
										style={{
											padding: '0.5em 0',
											margin: 'auto',
										}}>
										<div className={styles.quantitySelectorWrapper}>
											<div className={styles.quantitySelector}>
												<div>x {product.quantity}</div>
											</div>
										</div>
									</div>
								</CartItem>

								{i !== order.products.length - 1 && (
									<div
										style={{
											height: '1px',
											borderBottom: 'var(--border-style-dashed) var(--border-color)',
										}}></div>
								)}
							</div>
						))}
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						padding: '1em 0',
						borderTop: 'var(--border-style-dashed) var(--border-color)',
					}}>
					<h4>shipping to:</h4>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							lineHeight: '1.2em',
						}}>
						<span
							style={{
								fontWeight: '550',
							}}>
							{order.shipping.name}
						</span>
						<span>{order.shipping.address.line1}</span>
						<span>{order.shipping.address.line2}</span>
						<div
							style={{
								display: 'flex',
								gap: '0.3em',
							}}>
							<span>{`${order.shipping.address.city},`}</span>
							<span>{order.shipping.address.state}</span>
						</div>
						<span>{order.shipping.address.postal_code}</span>
					</div>
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						paddingTop: '1em',
						borderTop: 'var(--border-style-dashed) var(--border-color)',
					}}>
					<h4>total:</h4>
					<h4>
						{formatCurrencyString({
							value: data.amount_total,
							currency: data.currency,
						})}
					</h4>
				</div>
			</div>
		</div>
	)
}
