import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { Cart } from '../cart'

export const SideBar = () => {
	return (
		<>
			<div className={styles.right}>
				<>
					<nav style={{ borderBottom: '1px solid black', height: 'fit-content' }}>
						<div style={{ cursor: 'pointer', padding: '0em' }}>
							<Link href='/'>
								<a style={{ fontSize: '20px', fontWeight: '600' }} href='/'>
									<Image src='/lun.png' alt='logo' width={100} height={50} />
								</a>
							</Link>
						</div>
					</nav>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							flexWrap: 'wrap',
							fontSize: '15px',
							width: '100%',
							// padding: '0em 1em 0em 1em',
							height: '100%',
							lineHeight: '1.4em',
							overflow: 'auto',
						}}>
						<div>
							<div
								style={{
									padding: '0em 20px 0em 1.2em',
								}}>
								<span>
									Everything released is designed in-house Please be patient while we pack your order, it may
									take several days to leave our studio.
								</span>
								<br />
								<span>
									Shipping costs are calculated by weight at checkout. Please reach out if you have any
									questions - shop@duairakp.com
								</span>
								<br />
								<span>
									Each item is handmade one at a time all shipment details will be sent to your email
								</span>
								<br />
								<span>
									All orders ship in 100% recycled + recyclable packaging. Nothing is wrapped in plastic.
								</span>
							</div>

							<div
								style={{
									padding: '1em 0em',
									display: 'grid',
									gridTemplateColumns: 'auto 1fr',
									width: '100%',
									// height: '100%',
									padding: '0em 0.5em 0em 0.5em',
								}}>
								<div
									style={{
										margin: '0em 0.5em 0em 0em',

										width: '2px',
										height: '100%',
										background:
											'linear-gradient(180deg, #FD5660 0%, rgba(71, 166, 220, 0.72) 49.48%, #FFA800 97.17%)',
									}}></div>
								<div>
									<span>
										<span
											style={{
												color: '#F29B4E',
												fontWeight: '700',
											}}>
											PLEASE NOTE
										</span>
										- No refunds or exchanges, all sales are final at this time. Please double check your size
										and address! Measurements are included on every product page.
									</span>
									<br />
									<span>
										<span
											style={{
												color: '#DD5859',
												fontWeight: '700',
											}}>
											U.S. SHIPPPING
										</span>
										- orders ship via USPS, cost calculated at checkout.
									</span>
									<br />

									<span>
										<span
											style={{
												color: '#5A7BAE',
												fontWeight: '700',
											}}>
											INTERNATIONAL SHIPPING
										</span>
										- cost calculated at checkout. Packages may be subject to delays and fees at your local
										customs office. Please reach out to them directly to resolve. If your order gets sent back
										to us due to lack of claim, you will have to pay for a reship.
									</span>
								</div>
							</div>
							<br />
							<div
								style={{
									padding: '0em 20px 0em 1.2em',
								}}>
								<span>
									We accept no responsibility for any loss or damage to goods occurring in transit.
								</span>
								<br />

								<span>Please email us at shop@duairakp.com if you have questions about your purchase.</span>
							</div>
						</div>
					</div>
					<Cart />
					<div style={{ display: 'flex', justifyContent: 'space-between', padding: '0em 1em' }}>
						<span
							style={{
								color: '#A93C3E',
								fontWeight: '600',
							}}>
							© 2020 Duairak P
						</span>
						<span
							style={{
								color: '#5A7BAE',
								fontWeight: '600',
							}}>
							@duck.ruai
						</span>
					</div>
				</>
			</div>
		</>
	)
}
