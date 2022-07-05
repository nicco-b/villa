import Image from 'next/image'
import { formatCurrencyString } from 'use-shopping-cart'
import styles from '../../styles/Home.module.css'

export const CartItem = ({ product }) => {
	return (
		<>
			{' '}
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
					}}>
					<div className={styles.productImg}>
						<img src={`${product?.images[0]}`} width={35} height={35} alt={product.name} />
					</div>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						height: '100%',
						alignItems: 'center',
					}}>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '1fr auto auto',
							width: '100%',
							gap: '1em',
							alignItems: 'center',
							justifyContent: 'space-between',
							padding: '0em 1em',
						}}>
						<h4>{product.name}</h4>
						<span
							style={{
								fontSize: '0.8em',
							}}>
							qty:{product.quantity}
						</span>
						<h5>
							{formatCurrencyString({
								value: product.default_price.unit_amount * product.quantity,
								currency: 'usd',
							})}
						</h5>
					</div>

					<button>x</button>
				</div>
			</div>
		</>
	)
}
