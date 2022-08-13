import { useEffect, useLayoutEffect, useState } from 'react'
import { useMain } from '../../context/mainContext'
import { useShoppingCart } from '../../context/ShoppingCartContext'
import styles from '../../styles/Home.module.css'
import { Cart } from '../cart'

export const SideBar = ({ columns }) => {
	const [cartOpen, setCartOpen] = useState(false)
	const [infoOpen, setInfoOpen] = useState(false)
	const { cartQuantity } = useShoppingCart()

	const cN = columns
	// console.log(cN)
	const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
	useIsomorphicLayoutEffect(() => {
		if (columns === 2) {
			setInfoOpen(true)
		}

		return () => {
			setInfoOpen(false)
		}
	}, [columns])
	useEffect(() => {
		if (cartQuantity() > 0 && columns > 1) {
			setCartOpen(true)
		}
		return () => {
			// setCartOpen(false)
		}
	}, [cartQuantity, columns])

	return (
		<>
			<>
				<MobileBar
					cN={columns}
					setInfoOpen={setInfoOpen}
					infoOpen={infoOpen}
					setCartOpen={setCartOpen}
					cartOpen={cartOpen}
					cartTotal={cartQuantity()}>
					{infoOpen && <Information />}
					{cartOpen && <Cart />}
					{columns > 1 && (
						<div
							style={
								{
									// background: 'var(--bgAlt)',
								}
							}>
							<Footer />
						</div>
					)}
				</MobileBar>
				{/* bottom nav on mobile */}
				{columns === 1 && <Footer />}
			</>
		</>
	)
}
const MobileBar = ({ cN, children, setInfoOpen, infoOpen, cartOpen, setCartOpen, cartTotal }) => {
	return (
		<div
			className={`${cN > 1 ? styles.right : styles.rightClosed} ${cartOpen ? styles.right : ''}`}
			style={{
				overflowX: 'hidden',
			}}>
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
								fillRule='evenodd'
								clipRule='evenodd'
								d='M10.5 8.20005C10.5 6.06054 12.6593 4.20007 15 4.20007C17.3407 4.20007 19.5 6.06054 19.5 8.20005C19.5 10.2285 18.5029 11.1673 17.0048 12.4958L16.9307 12.5615C15.4448 13.8783 13.5 15.6017 13.5 19C13.5 19.8285 14.1716 20.5 15 20.5C15.8284 20.5 16.5 19.8285 16.5 19C16.5 17.0001 17.4897 16.0755 18.9952 14.7404L19.049 14.6927C20.5444 13.3671 22.5 11.6335 22.5 8.20005C22.5 4.01671 18.5821 1.20007 15 1.20007C11.4179 1.20007 7.5 4.01671 7.5 8.20005C7.5 9.02848 8.17157 9.70005 9 9.70005C9.82843 9.70005 10.5 9.02848 10.5 8.20005ZM15 26.715C15.9665 26.715 16.75 25.9315 16.75 24.965C16.75 23.9985 15.9665 23.215 15 23.215C14.0335 23.215 13.25 23.9985 13.25 24.965C13.25 25.9315 14.0335 26.715 15 26.715Z'
								fill={infoOpen ? '#E1DDCD' : '#2b2b2c'}
							/>
						</svg>
					</span>
				</div>
				<div
					style={{
						color: cartOpen ? '#985255' : '#2b2b2c',
						fontWeight: cartOpen ? '600' : '500',
						cursor: 'pointer',
						userSelect: 'none',
					}}
					onClick={() => {
						setCartOpen(!cartOpen)
					}}>
					cart {cartTotal > 0 && cartTotal}
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
				// background: '#e9d6bf90',
				borderTop: 'var(--border-style-dashed) var(--border-color)',
			}}>
			<span
				style={{
					color: '#A93C3E',
					fontWeight: '500',
				}}>
				© 2022 duiarak p
			</span>
			<span
				style={{
					color: '#5A7BAE',
					fontWeight: '500',
				}}>
				<a href='https://www.instagram.com/duck.ruai'>@duck.ruai</a>
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
						Each item is handmade one at a time so please allow slight differences from the images. Be
						patient while the product is being made as this is one person production. The product may take
						up to 4 weeks to be complete depending on the amout of orders I receive at the time.
					</span>
					<span>
						You will receive update emails while the product is being made and when it’s ready to be ship
						out to you.
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
								PLEASE NOTE - {''}
							</span>
							<span>
								No refunds or exchanges, all sales are final at this time. Please double check your items
								and address! Measurements are included on every product page.
							</span>
						</span>
						<br />

						<span>
							<span
								style={{
									color: '#5A7BAE',
									fontWeight: '700',
								}}>
								SHIPPING -{' '}
							</span>
							The shipping prices are included. International shipping may take around 2 weeks to arrive,
							so if you paln to purchase it as a gift please plan ahead. Packages may be subject to delays
							and fees at your local customs office. Reach out to them directly to resolve.
							<br />
							If your order gets sent back to us due to lack of claim, you will have to pay for a reship.
							You will receive tracking number through your email once your order has been shipped.
						</span>
					</div>
				</div>
				<div
					style={{
						padding: '0em 20px 0em 1.2em',
					}}>
					<span>We accept no responsibility for any loss or damage to goods occurring in transit.</span>
					<br />
					<br />

					<span
						style={{
							color: '#DD5859',
							fontWeight: '700',
						}}>
						CONTACT -{' '}
					</span>
					<span>Please reach out if you have any questions! duairak@gmail.com.</span>
				</div>
			</div>
		</div>
	)
}
