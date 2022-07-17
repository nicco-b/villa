import { formatCurrencyString } from 'use-shopping-cart'
import styles from '../../styles/Home.module.css'
import cartStyles from '../../styles/cart.module.css'
import { useShoppingCart } from '../../context/ShoppingCartContext'

export const CartItem = ({ product }) => {
	const { increaseQuantity, decreaseQuantity, message } = useShoppingCart()

	const handleDecrement = async () => {
		await decreaseQuantity(product)
	}
	const handleIncrement = async () => {
		await increaseQuantity(product)
	}
	return (
		<>
			{product && (
				<div className={cartStyles.cartItem}>
					<div className={cartStyles.cartItemImg}>
						<div className={styles.productImg}>
							<img src={`${product?.images[0]}`} width={35} height={35} alt={product.name} />
						</div>
					</div>
					<div>
						<div className={cartStyles.cartItemInfo}>
							<div className={cartStyles.pname}>
								<h4>{product.name}</h4>
							</div>
							<div className={cartStyles.rightInfo}>
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
			)}
		</>
	)
}
