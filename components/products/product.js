import { useEffect, useState } from 'react'
import { formatCurrencyString } from 'use-shopping-cart'
import { useShoppingCart } from '../../context/ShoppingCartContext'
import styles from '../../styles/Home.module.css'

export const Product = ({ product, isValidating }) => {
	const [addButtonState, setAddButtonState] = useState('default')
	useEffect(() => {
		let timer = setTimeout(() => {
			setAddButtonState('default')
		}, 500)
		return () => {
			clearTimeout(timer)
		}
	})
	const handleCartAdd = event => {
		event.preventDefault()
		increaseQuantity(product)
		setAddButtonState('success')
	}
	const { increaseQuantity } = useShoppingCart()

	return (
		<div
			style={{
				padding: '1em',
			}}>
			<div className={styles.productImg}>
				<img src={`${product?.images[0]}`} alt={'product_image'} layout={'fill'} />
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					height: '100%',
					alignItems: 'center',
				}}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '0.3em',
						alignItems: 'center',
						paddingBottom: '1em',
					}}>
					<h4>{product?.name}</h4>
					<p>{product?.dimensions}</p>
					<h4>
						{formatCurrencyString({
							value: product?.price,
							currency: 'usd',
						})}
					</h4>
				</div>
				<div
					style={{
						height: '32.2969px',
						backgroundColor: '#f5f5f5',
					}}>
					{product?.inventory > 0 ? (
						<button
							type={'button'}
							onClick={!isValidating && handleCartAdd}
							style={{
								minWidth: '110px',
							}}>
							{addButtonState === 'default' ? 'add to cart' : 'added!'}
						</button>
					) : (
						<button
							type={'button'}
							style={{
								minWidth: '110px',
								backgroundColor: '#D34014',
								color: '#333',
								border: 'none',
								cursor: 'not-allowed',
							}}>
							{'Out of Stock'}
						</button>
					)}
				</div>
			</div>
		</div>
	)
}
