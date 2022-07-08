import { products } from '../../pages/api/products/productList'
import { Product } from '../products/product'
import CartItems from '../../pages/api/products/productList'
import { CartItem } from './cartItem'
import { useEffect, useState } from 'react'
import getStripe from '../../utils/getStripe'
import { fetchPostJSON } from '../../utils/api-helpers'
import { useShoppingCart } from '../../context/ShoppingCartContext'
import useSWR from 'swr'
import { formatCurrencyString } from 'use-shopping-cart'
const fetcher = (...args) => fetch(...args).then(res => res.json())
export const Cart = () => {
	const { cart, clearCart, cartTotal, cartQuantity, removeItem } = useShoppingCart()
	const cartTotalPrice = cartTotal()
	// const cart = products
	const [loading, setLoading] = useState(false)
	const [cartEmpty, setCartEmpty] = useState(true)
	const [errorMessage, setErrorMessage] = useState('')

	useEffect(() => {
		// Check to see if this is a redirect back from Checkout
		const query = new URLSearchParams(window.location.search)
		if (query.get('success')) {
			console.log('Order placed! You will receive an email confirmation.')
		}

		if (query.get('canceled')) {
			console.log('Order canceled -- continue to shop around and checkout when you’re ready.')
		}
	}, [])
	const handleCheckout = async event => {
		event.preventDefault()
		setLoading(true)
		setErrorMessage('')
		const stripe = await getStripe()
		const formattedProducts = cart.map(item => {
			return {
				price: item.default_price.id,
				quantity: item.quantity,
			}
		})
		const order = await {
			products: cart,
			cartTotal: cartTotalPrice,
			cartQuantity: cartQuantity(),
		}
		// const orderRes = await fetchPostJSON('/api/orders', order)
		// console.log({ orderRes, order })
		const response = await fetchPostJSON('/api/checkout_sessions', {
			formattedProducts,
			order,
		})
		// console.log(response)

		const { session } = response

		if (response.statusCode > 399) {
			console.error(response.message)
			setErrorMessage(response.message)
			setLoading(false)
			return
		}

		//fullfill the order then redirect
		window.location = session.url
	}

	return (
		<div
			style={{
				overflow: 'hidden',
				height: '100%',
				display: 'grid',
				backgroundColor: 'var(--bgAlt)',
			}}>
			<div
				style={{
					borderTop: 'var(--border-style-dashed) var(--border-color)',
					borderBottom: 'var(--border-style-dashed) var(--border-color)',

					padding: '0.5em 1em 0.5em 1em',
					display: 'flex',
					justifyContent: 'space-between',
				}}>
				<h4>Cart</h4>

				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						gap: '0.5em',
						// padding: '0.5em 1em',
					}}>
					{cartQuantity() > 0 && ` ${cartQuantity()} ${cartQuantity() > 1 ? 'items' : 'item'}  `}
					<span>-</span>

					<h4>{cartTotalPrice}</h4>
				</div>
			</div>

			<div
				style={{
					borderBottom: 'var(--border-style-dashed) var(--border-color)',
					display: 'grid',
					padding: '0em 1em 0em 1em',
					maxHeight: '100%',
					height: '100%',
					overflow: 'hidden',
				}}>
				<div
					style={{
						display: 'grid',
						// padding: '0em 0em 1em 0em',
					}}>
					{cart.length ? (
						cart.map((product, i) => (
							<div
								style={{
									display: 'grid',
									gridTemplateColumns: '1fr auto',
								}}>
								<CartItem key={product.id} product={product}>
									{/* if not last item */}
									{i !== cart.length - 1 && (
										<div
											style={{
												height: '1px',
												backgroundColor: 'var(--border-color-alt)',
											}}></div>
									)}
								</CartItem>
								<button
									type='button'
									style={{
										padding: '0 1em',
										margin: '1em 0em 1em 0',
										display: 'flex',
										alignItems: 'center',
										// background: 'red',
									}}
									onClick={() => {
										removeItem(product.id)
									}}>
									<svg
										width='16'
										height='16'
										viewBox='0 0 16 16'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											fillRule='evenodd'
											clipRule='evenodd'
											d='M5.75 2C5.33579 2 5 2.33579 5 2.75C5 3.16421 5.33579 3.5 5.75 3.5H9.75C10.1642 3.5 10.5 3.16421 10.5 2.75C10.5 2.33579 10.1642 2 9.75 2H5.75ZM3 4.75C3 4.33579 3.33579 4 3.75 4H11.75C12.1642 4 12.5 4.33579 12.5 4.75C12.5 5.16421 12.1642 5.5 11.75 5.5H11.25V13.25C11.25 13.8023 10.8023 14.25 10.25 14.25H5.25C4.69772 14.25 4.25 13.8023 4.25 13.25V5.5H3.75C3.33579 5.5 3 5.16421 3 4.75ZM5.75 5.75V12.75H9.75V5.75H5.75Z'
											fill='black'
										/>
									</svg>
								</button>
							</div>
						))
					) : (
						<div
							style={{
								padding: '1em 0em 1em',
							}}>
							<p>Your cart is empty.</p>
						</div>
					)}
				</div>
			</div>

			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'flex-end',
					padding: '0.5em 1em',
				}}>
				<span
					style={{
						textDecoration: 'underline',
						color: cart.length ? '#2b2b2c' : '#cdcec1',
						cursor: cart.length ? 'pointer' : 'not-allowed',
					}}
					onClick={() => {
						if (cart.length) {
							clearCart()
						}
					}}>
					clear all
				</span>
				<form onSubmit={handleCheckout}>
					<section>
						<button
							type='submit'
							role='link'
							disabled={!cart.length || loading}
							style={{
								cursor: cart.length ? 'pointer' : 'not-allowed',

								background: cart.length ? (!loading ? '#F6F2E5' : '#d9d5c3') : '#d9d5c3',
								color: cart.length ? '#2b2b2c' : '#cdcec1',
							}}>
							{loading ? 'pls wait' : 'checkout'}
						</button>
					</section>
				</form>
			</div>
		</div>
	)
}
