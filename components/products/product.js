import { useEffect, useState } from 'react'
import { formatCurrencyString } from 'use-shopping-cart'
import { useShoppingCart } from '../../context/ShoppingCartContext'
import styles from '../../styles/Home.module.css'

export const Product = ({ product, isValidating }) => {
	const [currentVariant, setCurrentVariant] = useState(0)
	const { increaseQuantity, message, status } = useShoppingCart()

	const [addButtonState, setAddButtonState] = useState('default')
	useEffect(() => {
		let timer = setTimeout(() => {
			if (addButtonState !== 'waiting') {
				setAddButtonState('default')
			}
		}, 900)
		return () => {
			clearTimeout(timer)
		}
	})

	const handleCartAdd = async event => {
		event.preventDefault()
		setAddButtonState('waiting')
		await increaseQuantity(product.variants[currentVariant])
		setAddButtonState(message)
	}
	useEffect(() => {
		console.log({ message })
	}, [message])
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
					<h3
						style={{
							fontWeight: '500',
						}}>
						{product?.name}
					</h3>

					<h4
						style={{
							fontWeight: '500',
						}}>
						{/* {formatCurrencyString({
							value: product?.variants[currentVariant].price,
							currency: 'usd',
						})} */}
					</h4>
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						gap: '0.3em',
					}}>
					size
					<p>{product?.variants[currentVariant].dimensions.length}</p>x
					<p>{product?.variants[currentVariant].dimensions.width}</p>x
					<p>{product?.variants[currentVariant].dimensions.height}</p>
					<p>{product?.variants[currentVariant].dimensions.unit}</p>
				</div>
				<div>
					colors:
					{product?.variants
						.filter(v => !v.is_default)
						.map((variant, index) => (
							<div key={index}>
								<input
									type='radio'
									name='color'
									value={index}
									onChange={event => setCurrentVariant(parseInt(event.target.value) + 1)}
									checked={currentVariant === index + 1}
								/>
							</div>
						))}
				</div>
				<div
					style={{
						height: '32.2969px',
					}}>
					{product?.variants[currentVariant].inventory > 0 ? (
						<button
							type={'button'}
							onClick={handleCartAdd}
							disabled={addButtonState === 'waiting'}
							style={{
								minWidth: '110px',

								fontWeight: '550',
								color:
									addButtonState === 'default' || addButtonState === 'waiting'
										? ''
										: message === 'added!'
										? 'green'
										: message === 'maximum' && '#D33F14',
								backgroundColor:
									addButtonState === 'default' || addButtonState === 'waiting'
										? ''
										: message === 'added!'
										? ''
										: message === 'maximum' && '',
							}}>
							{addButtonState === 'default'
								? 'add to cart'
								: addButtonState === 'waiting'
								? 'adding...'
								: message}
						</button>
					) : (
						<button
							type={'button'}
							style={{
								minWidth: '110px',
								backgroundColor: '',
								color: 'rgba(211, 63, 20, 0.6)',
								borderColor: 'rgba(211, 63, 20, 0.2)',
								cursor: 'not-allowed',
								fontWeight: '550',
							}}>
							{'Out of Stock'}
						</button>
					)}
				</div>
				<div
					style={{
						padding: '10px',
						height: '32.2969px',
					}}>
					<p
						style={{
							color: '#F59F00',
						}}>
						{product?.inventory <= 3 && product?.inventory > 0 && 'low stock'}
					</p>
				</div>
			</div>
		</div>
	)
}
