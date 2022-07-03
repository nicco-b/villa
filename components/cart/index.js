import { Products } from '../products'
import { Product } from '../products/product'
import CartItems from '../../pages/api/products/products.json'
import { CartItem } from './cartItem'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect } from 'react'
import axios from 'axios'
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export const Cart = () => {
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
	const handleSubmit = async event => {
		event.preventDefault()
		const {
			data: { id },
		} = await axios.post(`http://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/checkout_sessions`, {
			items: [
				{
					price: 'price_1LHMVIHFFw3ZIEqv4zXNFN4k',
					quantity: 2,
				},
			],
		})
		// const stripe = await getStripe()
		// await stripe.redirectToCheckout({ sessionId: id })
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
					padding: '0.5em 1em 0 1em',
				}}>
				<h4>Cart</h4>
			</div>

			<div
				style={{
					borderBottom: 'var(--border-style-dashed) var(--border-color)',
					display: 'grid',
					padding: '0em 1em 0em 1em',
					maxHeight: '100%',
					height: '100%',
					overflow: 'auto',
				}}>
				<div
					style={{
						display: 'grid',
						padding: '0em 0em 1em 0em',
					}}>
					{CartItems.map((product, i) => (
						<>
							<CartItem key={product.id} product={product} />
							{/* if not last item */}
							{i !== CartItems.length - 1 && (
								<div
									style={{
										height: '1px',
										backgroundColor: 'var(--border-color-alt)',
									}}></div>
							)}
						</>
					))}
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
					}}>
					clear all
				</span>
				<form onSubmit={handleSubmit}>
					<section>
						<button
							type='submit'
							role='link'
							style={{
								background: '#F6F2E5',
								color: '#2b2b2c',
							}}>
							checkout
						</button>
					</section>
				</form>
			</div>
		</div>
	)
}
