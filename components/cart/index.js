import { Products } from '../products'
import { Product } from '../products/product'
import CartItems from '../../pages/api/products/products.json'
import { CartItem } from './cartItem'
export const Cart = () => {
	return (
		<>
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
										height: '2px',
										backgroundColor: '#ccc',
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
				<button>checkout</button>
			</div>
		</>
	)
}
