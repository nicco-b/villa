import { formatCurrencyString } from 'use-shopping-cart'
import styles from '../../styles/Home.module.css'
import { useShoppingCart } from '../../context/ShoppingCartContext'

export const CartItem = ({ product }) => {
	const { increaseQuantity, message } = useShoppingCart()

	const handleDecrement = async () => {}
	const handleIncrement = async () => {
		await increaseQuantity(product)
	}
	return (
		<>
			<div
				style={{
					display: 'grid',
					padding: '0.5em 0em',
					gap: '0em',
					gridTemplateColumns: 'auto 1fr',
					alignItems: 'center',
				}}>
				<div
					style={{
						display: 'grid',
						maxHeight: '50px',
						maxWidth: '50px',
						minHeight: '50px',
						minWidth: '50px',
					}}>
					<div className={styles.productImg}>
						<img src={`${product?.images[0]}`} width={35} height={35} alt={product.name} />
					</div>
				</div>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr auto',

						justifyContent: 'space-between',
						height: '100%',
						alignItems: 'center',
					}}>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '1fr 1fr',
							width: '100%',
							gap: '1em',
							alignItems: 'center',
							justifyItems: 'end',
							justifyContent: 'space-between',
							padding: '0em 0em 0 1em',
							height: '100%',
						}}>
						<div
							style={{
								maxWidth: '100%',
								minWidth: '25px',
								justifySelf: 'start',
							}}>
							<h4
								style={{
									width: '100%',
									overflow: 'hidden',

									whiteSpace: 'nowrap',
									textOverflow: 'ellipsis',
								}}>
								{product.name}
							</h4>
						</div>
						<div
							style={{
								display: 'flex',
								width: '100%',
								alignItems: 'center',
								justifyContent: 'space-between',
								height: '100%',
							}}>
							<div className={styles.quantitySelectorWrapper}>
								<button onClick={handleDecrement}>-</button>
								<div className={styles.quantitySelector}>
									<div>{product.quantity}</div>
								</div>
								<button onClick={handleIncrement}>+</button>
							</div>
							<h5>
								{formatCurrencyString({
									value: product.price * product.quantity,
									currency: 'usd',
								})}
							</h5>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
