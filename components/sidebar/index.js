import Image from 'next/image'
import Link from 'next/link'
import { useLayoutEffect, useState } from 'react'
import { useMain } from '../../context/mainContext'
import styles from '../../styles/Home.module.css'
import { Cart } from '../cart'

export const SideBar = ({ columns }) => {
	const [cartOpen, setCartOpen] = useState(false)
	const [infoOpen, setInfoOpen] = useState(false)

	const cN = columns
	console.log(cN)
	useLayoutEffect(() => {
		if (columns === 2) {
			setInfoOpen(true)
		}

		return () => {
			setInfoOpen(false)
		}
	}, [columns])

	return (
		<>
			{columns > 1 ? (
				<>
					<MobileBar
						cN={columns}
						setInfoOpen={setInfoOpen}
						infoOpen={infoOpen}
						setCartOpen={setCartOpen}
						cartOpen={cartOpen}>
						{infoOpen && <Information />}
						{cartOpen && <Cart />}
						<div
							style={{
								background: 'var(--bgAlt)',
							}}>
							<Footer />
						</div>
					</MobileBar>
				</>
			) : (
				<>
					<MobileBar
						cN={columns}
						setInfoOpen={setInfoOpen}
						infoOpen={infoOpen}
						setCartOpen={setCartOpen}
						cartOpen={cartOpen}>
						{infoOpen && <Information />}
						{cartOpen && <Cart />}
					</MobileBar>
					{/* bottom nav on mobile */}

					<Footer />
				</>
			)}
		</>
	)
}
const MobileBar = ({ cN, children, setInfoOpen, infoOpen, cartOpen, setCartOpen }) => {
	const { cartTotal } = useMain()

	return (
		<div
			className={`${cN > 1 ? styles.right : styles.rightClosed} ${cartOpen ? styles.darkerBg : ''}`}>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '0em 1em',
					height: '40px',
				}}>
				<div
					style={{
						background: infoOpen ? '#5A7BAE' : 'var(--bg)',
						height: '28px',
						width: '28px',
						display: 'flex',
						borderRadius: '50%',
						position: 'relative',
						cursor: cN === 1 ? 'pointer' : 'default',
						userSelect: 'none',
					}}
					onClick={() => {
						if (cN === 1) {
							setInfoOpen(!infoOpen)
						}
					}}>
					<span
						style={{
							width: '100%',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							padding: '6px',
						}}>
						<svg
							width='30'
							height='30'
							viewBox='0 0 30 30'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								fill-rule='evenodd'
								clip-rule='evenodd'
								d='M10.5 8.20005C10.5 6.06054 12.6593 4.20007 15 4.20007C17.3407 4.20007 19.5 6.06054 19.5 8.20005C19.5 10.2285 18.5029 11.1673 17.0048 12.4958L16.9307 12.5615C15.4448 13.8783 13.5 15.6017 13.5 19C13.5 19.8285 14.1716 20.5 15 20.5C15.8284 20.5 16.5 19.8285 16.5 19C16.5 17.0001 17.4897 16.0755 18.9952 14.7404L19.049 14.6927C20.5444 13.3671 22.5 11.6335 22.5 8.20005C22.5 4.01671 18.5821 1.20007 15 1.20007C11.4179 1.20007 7.5 4.01671 7.5 8.20005C7.5 9.02848 8.17157 9.70005 9 9.70005C9.82843 9.70005 10.5 9.02848 10.5 8.20005ZM15 26.715C15.9665 26.715 16.75 25.9315 16.75 24.965C16.75 23.9985 15.9665 23.215 15 23.215C14.0335 23.215 13.25 23.9985 13.25 24.965C13.25 25.9315 14.0335 26.715 15 26.715Z'
								fill={infoOpen ? '#E1DDCD' : '#2b2b2c'}
							/>
						</svg>
					</span>
				</div>
				<div
					style={{
						color: cartOpen ? '#DD5859' : '#2b2b2c',
						fontWeight: cartOpen ? '600' : '500',
						cursor: 'pointer',
						userSelect: 'none',
					}}
					onClick={() => {
						setCartOpen(!cartOpen)
					}}>
					cart {cartTotal}
				</div>
			</div>
			{children}
		</div>
	)
}
const Footer = () => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				padding: '0.5em 1em',
				background: 'inherit',
				borderTop: 'var(--border-style-dashed) var(--border-color)',
			}}>
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
	)
}
const Information = () => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				flexWrap: 'wrap',
				fontSize: '15px',
				width: '100%',
				padding: '0em 0em 2em 0em',
				height: '100%',
				lineHeight: '1.4em',
				overflow: 'auto',
				borderTop: 'var(--border-style-dashed) var(--border-color)',
			}}>
			<div
				style={{
					display: 'grid',
					// padding: '1em 20px 1em 1.2em',
					gap: '0.3em',
					fontWeight: '450',
				}}>
				<div
					style={{
						display: 'grid',
						padding: '1em 20px 1em 1.2em',
						gap: '0.3em',
						// fontWeight: '450',
					}}>
					<span>
						Everything released is designed in-house Please be patient while we pack your order, it may
						take several days to leave our studio.
					</span>
					<span>
						Shipping costs are calculated by weight at checkout. Please reach out if you have any
						questions - shop@duairakp.com
					</span>
					<span>
						Each item is handmade one at a time all shipment details will be sent to your email
					</span>
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
						padding: '0em 0.5em 0.5em 0.5em',
					}}>
					<div
						style={{
							margin: '0em 0.5em 0em 0em',

							width: '2px',
							height: '100%',
							background:
								'linear-gradient(180deg, #FD5660 0%, rgba(71, 166, 220, 0.72) 49.48%, #FFA800 97.17%)',
						}}></div>
					<div
						style={{
							display: 'grid',
						}}>
						<span>
							<span
								style={{
									color: '#F29B4E',
									fontWeight: '700',
								}}>
								PLEASE NOTE
							</span>
							<span>
								- No refunds or exchanges, all sales are final at this time. Please double check your size
								and address! Measurements are included on every product page.
							</span>
						</span>
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

						<span>
							<span
								style={{
									color: '#5A7BAE',
									fontWeight: '700',
								}}>
								INTERNATIONAL SHIPPING
							</span>
							- cost calculated at checkout. Packages may be subject to delays and fees at your local
							customs office. Please reach out to them directly to resolve. If your order gets sent back to
							us due to lack of claim, you will have to pay for a reship.
						</span>
					</div>
				</div>
				<div
					style={{
						padding: '0em 20px 0em 1.2em',
					}}>
					<span>We accept no responsibility for any loss or damage to goods occurring in transit.</span>
					<br />

					<span>Please email us at shop@duairakp.com if you have questions about your purchase.</span>
				</div>
			</div>
		</div>
	)
}
