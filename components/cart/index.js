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
	const { cart, clearCart, cartTotal, cartQuantity } = useShoppingCart()
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
		const response = await fetchPostJSON('/api/checkout_sessions', formattedProducts)

		if (response.statusCode > 399) {
			console.error(response.message)
			setErrorMessage(response.message)
			setLoading(false)
			return
		}
		console.log(response)
		stripe.redirectToCheckout({ sessionId: response.id })
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
