import { formatCurrencyString } from 'use-shopping-cart'
import styles from '../../styles/Home.module.css'
import cartStyles from '../../styles/cart.module.css'
import { useShoppingCart } from '../../context/ShoppingCartContext'
import { useEffect, useState } from 'react'
import LoadingIcon from '../utils/LoadingIcon'
import Image from 'next/image'

export const CartItem = ({ product }) => {
	return (
		<>
			{product && (
				<div className={cartStyles.cartItem}>
					<div className={cartStyles.cartItemImg}>
						<div className={styles.productImg}>
							<Image src={`${product?.featured_image}`} layout='fill' alt={product.name} />
						</div>
					</div>

					<div className={cartStyles.cartItemInfo}>
						<div className={cartStyles.pname}>
							<h4>{product.name}</h4>
							<div>{product?.attributes && Object.values(product.attributes).join(', ')}</div>
						</div>
						<div className={cartStyles.rightInfo}>
							<h5>
								{formatCurrencyString({
									value: product.price * product.quantity,
									currency: 'usd',
								})}
							</h5>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
