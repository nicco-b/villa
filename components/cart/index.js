import { Products } from '../products'
import { Product } from '../products/product'
import CartItems from '../../pages/api/products/products.json'
import { CartItem } from './cartItem'
export const Cart = () => {
	return (
		<>
			<div
				style={{
					borderTop: '1px dashed black',
					padding: '0em 1em',
				}}>
				<h4>Cart</h4>
			</div>

			<div
				style={{
					borderTop: '1px solid black',
					borderBottom: '1px solid black',

					display: 'grid',
					padding: '1em 1em 0.5em 1em',
					maxHeight: '100%',
					height: '100%',

					overflow: 'auto',

					// justifyContent: 'space-between',
				}}>
				<div
					style={{
						// border: '1px solid red',

						display: 'grid',

						padding: '1em 0em 1em 0em',
						// justifyContent: 'space-between',
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
					padding: '1em',
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
