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
								gap: '1em',
								alignItems: 'center',
								justifyItems: 'center',
							}}>
							<h5>
								{formatCurrencyString({
									value: product.default_price.unit_amount * product.quantity,
									currency: 'usd',
								})}
							</h5>
							<span
								style={{
									fontSize: '0.8em',
								}}>
								{product.quantity}x
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
