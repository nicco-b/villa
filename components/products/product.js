import { useEffect, useState } from 'react'
import { formatCurrencyString } from 'use-shopping-cart'
import { useShoppingCart } from '../../context/ShoppingCartContext'
import styles from '../../styles/Home.module.css'
import ColorThief from '../../node_modules/colorthief/dist/color-thief.mjs'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import Image from 'next/image'
export const RadioGroup = RadioGroupPrimitive.Root
export const RadioGroupRadio = RadioGroupPrimitive.Item
export const RadioGroupIndicator = RadioGroupPrimitive.Indicator
function getAverageRGB(imgEl) {
	var blockSize = 5, // only visit every 5 pixels
		defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
		canvas = document.createElement('canvas'),
		context = canvas.getContext && canvas.getContext('2d'),
		data,
		width,
		height,
		i = -4,
		length,
		rgb = { r: 0, g: 0, b: 0 },
		count = 0

	if (!context) {
		return defaultRGB
	}

	height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height
	width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width

	context.drawImage(imgEl, 0, 0)

	try {
		data = context.getImageData(0, 0, width, height)
	} catch (e) {
		/* security error, img on diff domain */
		return defaultRGB
	}

	length = data.data.length

	while ((i += blockSize * 4) < length) {
		++count
		rgb.r += data.data[i]
		rgb.g += data.data[i + 1]
		rgb.b += data.data[i + 2]
	}

	// ~~ used to floor values
	rgb.r = ~~(rgb.r / count)
	rgb.g = ~~(rgb.g / count)
	rgb.b = ~~(rgb.b / count)

	return rgb
}
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
	//sort product.variants by if inventory is 0 or not
	const variantsS = product.variants.sort((a, b) => {
		if (a.inventory > 0 && b.inventory === 0) {
			return -1
		} else if (a.inventory === 0 && b.inventory > 0) {
			return 1
		} else {
			return 0
		}
	})
	return (
		<div
			style={{
				padding: '1em',
			}}>
			<div className={styles.productImg}>
				<Image
					layout='fill'
					id={`${product?.variants[currentVariant]?.featured_image}`}
					src={`${product?.variants[currentVariant]?.featured_image}`}
					alt={'product_image'}
				/>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					height: '100%',
					alignItems: 'center',
					paddingTop: '0.5em',
				}}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '0.3em',
						alignItems: 'center',
						paddingBottom: '0.6em',
					}}>
					<h4
						style={{
							fontWeight: '500',
						}}>
						{product?.name}
					</h4>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							gap: '0.3em',
							padding: '0em 0 0em 0',
							fontSize: '1.125rem',
						}}>
						<p>{product?.variants[currentVariant]?.dimensions.length}"</p>x
						<p>{product?.variants[currentVariant]?.dimensions.width}"</p>
					</div>
					<h4
						style={{
							fontWeight: '500',
						}}>
						{formatCurrencyString({
							value: product?.variants[currentVariant]?.price,
							currency: 'usd',
						})}
					</h4>
				</div>

				{product.variants.length > 1 && (
					<div
						style={{
							display: 'flex',
							gap: '1em',
							flexDirection: 'row',
						}}>
						<RadioGroup
							className={styles.radioGroup}
							name='color'
							defaultValue={currentVariant}
							value={currentVariant}
							aria-label='View density'
							onValueChange={value => setCurrentVariant(value)}>
							{/* {product?.variants.map((variant, index) => {
								// console.log({ variant })
								const name = variant?.attributes && Object.values(variant.attributes).join(', ')
								// console.log(name)
								return (
									<ColorAttribute
										index={index}
										key={index}
										name={name}
										variant={variant}
										currentVariant={currentVariant}
										setCurrentVariant={setCurrentVariant}
									/>
								)
							})} */}
							{
								// sort product variants where inventory === 0 last
								variantsS.map((variant, index) => {
									// console.log({ variant })
									const name = variant?.attributes && Object.values(variant.attributes).join(', ')
									// console.log(name)
									return (
										<ColorAttribute
											index={index}
											key={index}
											name={name}
											variant={variant}
											currentVariant={currentVariant}
											setCurrentVariant={setCurrentVariant}
										/>
									)
								})
							}
						</RadioGroup>
					</div>
				)}
				<div
					style={{
						height: '32.2969px',
					}}>
					{product?.variants[currentVariant]?.inventory > 0 ? (
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
							color: 'rgba(246, 147, 40, 1.0)',
						}}>
						{product?.inventory <= 3 && product?.inventory > 0 && 'low stock'}
					</p>
				</div>
			</div>
		</div>
	)
}
const ColorAttribute = ({ variant, name, index, currentVariant, setCurrentVariant }) => {
	// get dominant color from variant.featured_image

	return (
		<>
			<div className={styles.radioButtonGroup}>
				<RadioGroupRadio
					style={{
						backgroundColor: variant.hex,
						zIndex: '3',
					}}
					data-color={name}
					value={index}
					id={index}
					className={styles.radioButton}>
					<RadioGroupIndicator data-color={name} className={`${styles.radioIndicator}`} />
				</RadioGroupRadio>
				{/* <label htmlFor={index}>{name}</label> */}
			</div>
		</>
	)
}
