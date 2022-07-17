import { createContext, useContext, useReducer, useState } from 'react'
import { formatCurrencyString } from 'use-shopping-cart'
import axios from 'axios'
export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({ children }) => {
	const [cart, setCart] = useState([])
	const [message, setMessage] = useState('')
	const [waiting, setwaitinf] = useState(false)
	//increaseQuantity

	const getProduct = async (product, q) => {
		console.log(q)

		//throttle the request

		const data = await axios
			.post(`/api/cart`, {
				id: product.id,
				q,
			})
			.then(res => {
				return res.data
			})
			.catch(err => {
				// console.log(err)
				return err.response.data
			})

		return data
	}

	const increaseQuantity = async product => {
		const id = product.id
		const item = await cart.find(item => item.id === id)
		console.log({ item })
		const q = item && item.quantity

		//check database for product
		//fetch product from database
		const { message, inventory } = await getProduct(product, q)
		setCart(currItems => {
			//if not in cart, add one

			//if product inventory is greater than or equal to current product quantity in cart
			//if message is not 'maximum'
			if (message !== 'maximum') {
				if (!currItems.find(item => item?.id === id)) {
					setMessage(message)

					return [...currItems, { ...product, quantity: 1 }]
				} else {
					const quantity = currItems?.find(item => item?.id === id).quantity
					const productInventory = inventory
					const e = productInventory > quantity
					//if in cart, increase quantity
					if (e) {
						return currItems.map(item => {
							if (item?.id === id) {
								setMessage(message)

								return { ...item, quantity: item.quantity + 1 }
							} else {
								setMessage(message)

								return item
							}
						})
					} else {
						setMessage(message)
						return currItems
					}
				}
			}
			setMessage(message)
			return currItems
		})
	}
	//decreaseQuantity
	const decreaseQuantity = async product => {
		const id = product.id
		const item = await cart.find(item => item.id === id)
		console.log({ item })
		const q = item && item.quantity
		setCart(currItems => {
			//if not in cart, return
			if (!currItems.find(item => item?.id === id)) {
				return currItems
			} else {
				const quantity = currItems?.find(item => item?.id === id).quantity
				//if in cart, decrease quantity
				if (quantity > 1) {
					return currItems.map(item => {
						if (item?.id === id) {
							return { ...item, quantity: item.quantity - 1 }
						} else {
							return item
						}
					})
				} else {
					return currItems.filter(item => item?.id !== id)
				}
			}
		})
	}

	//cartQuantity
	const cartQuantity = () => cart?.reduce((quantity, item) => item?.quantity + quantity, 0)
	//decreaseQuantity
	//removeItem
	const removeItem = id => {
		setCart(currItems => {
			return currItems.filter(item => item?.id !== id)
		})
	}
	//clearCart
	const clearCart = () => {
		setCart([])
	}

	//addItem
	//getItemQuantity
	const getItemQuantity = id => {
		return cart.find(item => item.id === id)?.quantity || 0
	}
	//totalPrice
	const cartTotal = () => {
		const a = cart.reduce((total, item) => total + item.price * item.quantity, 0)
		// console.log({ a })

		return formatCurrencyString({
			value: a,
			currency: 'usd',
		})
	}

	//end functions
	return (
		<ShoppingCartContext.Provider
			value={{
				getItemQuantity,
				increaseQuantity,
				decreaseQuantity,
				cartQuantity,
				removeItem,
				clearCart,
				cartTotal,
				cart,
				message,
			}}>
			{children}
		</ShoppingCartContext.Provider>
	)
}
export const useShoppingCart = () => {
	return useContext(ShoppingCartContext)
}
