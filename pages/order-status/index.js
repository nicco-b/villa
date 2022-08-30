import moment from 'moment-timezone'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useSWR, { SWRConfig } from 'swr'
import SecondaryLayout from '../../components/layouts/SecondaryLayout'
import { getOrderStatus } from '../api/orders/status'
import styles from './order-status.module.css'
export default function Index({ fallback }) {
	return (
		<SWRConfig
			value={{
				fallback,
				// revalidate: true,
				// revalidateOnFocus: true,
				fetcher: (...args) => fetch(...args).then(res => res.json()),
			}}>
			<OrderStatus />
		</SWRConfig>
	)
}
const OrderStatus = () => {
	const router = useRouter()

	const { data, isValidating, error } = useSWR(
		router.query.id || router.query.email
			? `/api/orders/status?id=${router.query.id}&email=${router.query.email}`
			: null
	)
	const order = data
	return (
		<div>
			{order?._id ? (
				<OrderStatusDetails order={order} />
			) : (
				<div
					className={styles.loading}
					style={{
						padding: '2em 3em',
						maxWidth: '600px',
						margin: '0 auto',
					}}>
					{!isValidating ? <SearchOrder error={order} /> : 'no order'}
				</div>
			)}
		</div>
	)
}
const SearchOrder = ({ error, order }) => {
	console.log(order)
	const router = useRouter()
	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				router.push(`/order-status?id=${event.target.id.value}&email=${event.target.email.value}`)
			}}>
			<div
				style={{
					paddingBottom: '1em',
				}}>
				check order status:
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'start',
					gap: '1em',
				}}>
				<input className='inputText' type='text' placeholder='order id' name='id' />
				<input className='inputText' type='text' placeholder='email' name='email' />
				<button type='submit'>search</button>
				{
					<div
						style={{
							color: 'maroon',
						}}>
						{error?.message}
					</div>
				}
			</div>
		</form>
	)
}

const OrderStatusDetails = ({ order }) => {
	return (
		<>
			{order && (
				<>
					<div
						style={{
							display: 'flex',
							width: '100%',
							maxHeight: '400px',

							// aspectRatio: '1',s
							justifyContent: 'center',
						}}>
						<Image width={400} height={400} src={changeStatusImage(order.status)} />
					</div>

					<div
						style={{
							display: 'flex',
							padding: '2em 0 0em 0',
							justifyContent: 'center',
							fontSize: '1.2em',
						}}>
						order #{order?._id?.slice(-5)}
					</div>
					<div
						style={{
							display: 'flex',
							padding: '2em 0 1em 0',
							justifyContent: 'center',
							fontSize: '1.2em',
						}}>
						current: {order?.status}
					</div>
					<div
						style={{
							display: 'flex',
							width: '100%',
							// height: '300px',
							justifyContent: 'center',
						}}>
						<div
							style={{
								display: 'flex',
								width: '100%',
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							<ProgressBar status={order?.status_history[1]} />
							<ProgressLine status={order?.status_history[2]} />
							<ProgressBar status={order?.status_history[2]} />
							<ProgressLine status={order?.status_history[3]} />
							<ProgressBar status={order?.status_history[3]} />
							<ProgressLine status={order?.status_history[4]} />
							<ProgressBar status={order?.status_history[4]} />
						</div>
					</div>

					<div className={styles.orderstatus}>
						{order &&
							order.status_history
								.filter(status => status.status !== 'created' && status.status !== 'cancelled')
								.map(status => (
									<div
										key={status.status}
										style={{
											display: 'grid',
											gridTemplateColumns: '1fr auto 1fr',
											gap: '1em',
											width: '100%',
											// overflow: 'hidden',
										}}>
										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'end',
												justifyContent: 'end',
												// width: '100%',
											}}>
											<div>{moment(status.date).format('l')}</div>
											<div
												style={{
													color: '#2b2b2c50',
												}}>
												{moment(status.date).format('h:mm A')}
											</div>
										</div>
										<div
											style={{
												width: '1px',

												backgroundColor: '#2b2b2c30',
												height: '100%',
												padding: '1em 0',
												margin: '1.2em 0',
												color: '#2b2b2c20',
											}}
										/>
										<div
											style={{
												display: 'flex',
												// width: '100%',
												// whiteSpace: 'nowrap',/
												alignItems: 'end',
												// margin: '0 0 0.5em 0',
												// padding: '1em 0',
												// justifyContent: 'end',
											}}>
											{changeStatusMessage(status.status, order.tracking)}
										</div>
									</div>
								))}
					</div>
				</>
			)}
		</>
	)
}
const ProgressBar = ({ status }) => {
	return (
		<>
			<div
				style={{
					display: 'flex',
					borderRadius: '99999px',
					backgroundColor: status ? '#36AA79' : 'tan',

					// border: '1px solid #e0c6ab40',
					width: '35px',
					height: '35px',
					marginLeft: '-5px',
					zIndex: status ? '1' : '0',
				}}
			/>
		</>
	)
}
const ProgressLine = ({ status }) => {
	return (
		<>
			<div
				style={{
					height: '12px',
					width: '40px',
					backgroundColor: status ? '#36AA79' : 'tan',
					marginLeft: '-5px',
					zIndex: status ? '1' : '0',
				}}
			/>
		</>
	)
}
const changeStatusMessage = (status, tracking) => {
	console.log(status, tracking)
	switch (status) {
		case 'paid':
			return 'Order Received'
		case 'processing':
			return 'Order is being made'
		case 'shipped':
			return (
				<div
					style={{
						display: 'flex',
						justifyContent: 'start',
						flexDirection: 'column',
						width: '100%',
					}}>
					<span>Order is on its way!</span>
					<a
						style={{
							color: '#2e152d70',
						}}
						href={`https://www.dhl.com/th-en/home/tracking/tracking-express.html?submit=1&tracking-id=${tracking.tracking_number}`}>
						{tracking.tracking_number}
					</a>
				</div>
			)
		case 'complete':
			return (
				<div
					style={{
						display: 'flex',
						justifyContent: 'start',
						flexDirection: 'column',
						width: '100%',
					}}>
					<span>Order Delivered</span>
					<span>Thank you!</span>
				</div>
			)
		case 'cancelled':
			return 'Order Cancelled'
		default:
			return 'Order Created'
	}
}
const changeStatusImage = status => {
	switch (status) {
		case 'paid':
			return '/order-shipped.gif'
		case 'processing':
			return '/order-processing.png'
		case 'shipped':
			return '/order-shipped.gif'
		case 'complete':
			return '/order-complete.png'
		case 'cancelled':
			return 'order-cancelled.png'
		default:
			return 'order-created.png'
	}
}

Index.getLayout = function getLayout(page) {
	return <SecondaryLayout>{page}</SecondaryLayout>
}
export async function getServerSideProps(context) {
	const { params, query } = context
	if (query.id || query.email) {
		const orderWStatus = await getOrderStatus({
			id: query?.id,
			email: query?.email,
		})

		return {
			props: {
				fallback: {
					order: JSON.parse(JSON.stringify(orderWStatus)),
				},
			},
		}
	}
	return {
		props: {
			fallback: {
				order: {},
			},
		},
	}
}
