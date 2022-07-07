import Image from 'next/image'
import { formatCurrencyString } from 'use-shopping-cart'
import { useShoppingCart } from '../../context/ShoppingCartContext'
import styles from '../../styles/Home.module.css'

export const CartItem = ({ product }) => {
	const { removeItem } = useShoppingCart()
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
							justifyItems: 'center',
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
								gap: '0.5em',
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
								qty:{product.quantity}
							</span>
						</div>
					</div>

					<button
						type='button'
						style={{
							padding: '0.5em 1em',
							display: 'flex',
							alignItems: 'center',
						}}
						onClick={() => {
							removeItem(product.id)
						}}>
						<svg
							width='15'
							height='15'
							viewBox='0 0 15 15'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								fill-rule='evenodd'
								clip-rule='evenodd'
								d='M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z'
								fill='black'
							/>
						</svg>
					</button>
				</div>
			</div>
		</>
	)
}
