import Link from 'next/link'
import styles from '../../styles/Home.module.css'

export const Product = ({ product }) => {
	return (
		<div
			style={{
				// border: '1px solid blue',
				padding: '1em',
			}}>
			<div className={styles.productImg}>
				<img src={`/totem${product.id}.png`} alt={'product_image'} />
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
					<h4>{product.name}</h4>
					<h5>{product.dimensions}</h5>
					<h5>{product.price}</h5>
				</div>

				<button>order</button>
			</div>
		</div>
	)
}
