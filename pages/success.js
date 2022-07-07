import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { useShoppingCart } from '../context/ShoppingCartContext'
import axios from 'axios'
import confetti from 'canvas-confetti'
import Link from 'next/link'
import { TopBar } from '../components/topbar'
import LoadingIcon from '../components/utils/LoadingIcon'
import styles from '../styles/Summary.module.css'
import { formatCurrencyString } from 'use-shopping-cart'
export const fetcher = url => axios.get(url).then(res => res.data)
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
const Success = () => {
	const {
		query: { session_id },
	} = useRouter()

	const { clearCart } = useShoppingCart()

	const { data, error } = useSWR(() => `/api/checkout_sessions/${session_id}`, fetcher)
	console.log({ data, error })

	useEffect(() => {
		if (data) {
			shootFireworks()
			clearCart()
		}
	}, [data])

	return (
		<>
			<div className={styles.summaryWrapper}>
				<TopBar />
				<div className={styles.summaryBox}>
					<div className={styles.summary}>
						{error ? (
							<div>
								<p>Sorry, something went wrong!</p>
							</div>
						) : !data ? (
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									paddingTop: '4em',
								}}>
								<LoadingIcon />
							</div>
						) : (
							<SuccessInfo data={data} />
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default Success
const SuccessInfo = ({ data }) => {
	return (
		<div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					paddingTop: '4em',
				}}>
				<h5>{data.customer_details.name}</h5>

				<h2>Thanks for your order!</h2>
				<p>Check your inbox for the receipt.</p>
				<CompletedOrderSummary data={data} />

				<Link href={'/'}>
					<button>home</button>
				</Link>
			</div>
		</div>
	)
}

const CompletedOrderSummary = ({ data }) => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				padding: '2em 0',
				width: '100%',
				height: '100%',
			}}>
			<div>order summary</div>
			<div
				style={{
					margin: '0.5em',

					width: '100%',
					height: '100%',

					border: 'var(--border-style-dashed) var(--border-color)',
				}}>
				<div>
					total:
					{formatCurrencyString({
						value: data.amount_total,
						currency: data.currency,
					})}
				</div>
			</div>
		</div>
	)
}
