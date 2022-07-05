import Link from 'next/link'
import { formatCurrencyString } from 'use-shopping-cart'
import styles from '../../styles/Home.module.css'
import { formatAmountForDisplay } from '../../utils/stripe-helpers'

export const Product = ({ product, single }) => {
	const handleClickOrderButton = event => {
		event.preventDefault()
		console.log('order button clicked')
	}

	return (
		<div
			style={{
				padding: '1em',
			}}>
			<div className={styles.productImg}>
				<img src={`${product.images[0]}`} alt={'product_image'} />
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
						gap: '0.2em',
						alignItems: 'center',
						paddingBottom: '1em',
					}}>
					<h>{product.name}</h>
					<h5>{product.dimensions}</h5>
					<h4>
						{formatCurrencyString({
							value: product.default_price.unit_amount,
							currency: 'usd',
						})}
					</h4>
				</div>

				<button type={'button'} onClick={handleClickOrderButton}>
					order
				</button>
			</div>
		</div>
	)
}
