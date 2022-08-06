import { createContext, useContext, useReducer, useState } from 'react'
import { formatCurrencyString } from 'use-shopping-cart'
import axios from 'axios'
export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({ children }) => {
	const [cart, setCart] = useState([])
	const [message, setMessage] = useState('')
	const [status, setStatus] = useState(null)
	//increaseQuantity

	const getProduct = async (product, q) => {
		console.log(q)

		//throttle the request

		const data = await axios
			.post(`/api/cart`, {
				id: product.product_id,
				vid: product._id,
				q: !q ? 0 : q,
			})
			.then(res => {
				console.log(res)

				return {
					data: res.data,
					status: res.status,
				}
			})
			.catch(err => {
				console.log(err)

				return {
					data: err.response.data,
					status: err.response.status,
				}
			})
		return data
	}

	const increaseQuantity = async product => {
		console.log('pp', product)
		const id = product._id
		const item = await cart.find(item => item._id === id)
		console.log({ item })
		const q = item && item.quantity

		//check database for product
		//fetch product from database
		const { data, status } = await getProduct(product, q, id)
		setStatus(status)

		setCart(currItems => {
			const message = data.message
			const inventory = data.inventory
			//if not in cart, add one
			console.log({ data })
			//if product inventory is greater than or equal to current product quantity in cart
			//if message is not 'maximum'
			if (status === 200) {
				if (!currItems.find(item => item?._id === id)) {
					setMessage(message)

					return [...currItems, { ...product, ...data, quantity: 1 }]
				} else {
					const quantity = currItems?.find(item => item?._id === id).quantity
					const productInventory = inventory
					const e = productInventory > quantity
					//if in cart, increase quantity
					if (e) {
						return currItems.map(item => {
							if (item?._id === id) {
								setMessage(message)

								return { ...item, ...data, quantity: item.quantity + 1 }
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
		const id = product._id
		const item = await cart.find(item => item._id === id)
		console.log({ item })
		const q = item && item.quantity
		setCart(currItems => {
			//if not in cart, return
			if (!currItems.find(item => item?._id === id)) {
				return currItems
			} else {
				const quantity = currItems?.find(item => item?._id === id).quantity
				//if in cart, decrease quantity
				if (quantity > 1) {
					return currItems.map(item => {
						if (item?._id === id) {
							return { ...item, quantity: item.quantity - 1 }
						} else {
							return item
						}
					})
				} else {
					return currItems.filter(item => item?._id !== id)
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
		return cart.reduce(function (acc, obj) {
			return acc + obj.quantity
		}, 0)
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
				status,
			}}>
			{children}
		</ShoppingCartContext.Provider>
	)
}
export const useShoppingCart = () => {
	return useContext(ShoppingCartContext)
}
