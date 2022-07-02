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
				<img src='/totem1.png' />
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					height: '100%',
					alignItems: 'center',
				}}>
				<div>{product.name}</div>
				<span>{product.dimensions}</span>
				<span>{product.price}</span>

				<button>order</button>
			</div>
		</div>
	)
}
