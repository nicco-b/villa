import { createContext, useContext, useReducer, useState } from 'react'
import { formatCurrencyString } from 'use-shopping-cart'
import axios from 'axios'
export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({ children }) => {
	const [cart, setCart] = useState([])
	const [message, setMessage] = useState('added!')
	//increaseQuantity
	const getProduct = async product => {
		const { data } = await axios.get(`/api/products/${product.id}`)
		return data
	}

	const increaseQuantity = async product => {
		const id = product.id
		console.log(id)
		//check database for product
		//fetch product from database

		const data = await getProduct(product)
		console.log(data)
		const productInventory = data.inventory

		if (productInventory > 0) {
			setCart(currItems => {
				//if not in cart, add one

				//if product iventory is grreater than or equal to current product quantity in cart
				if (!currItems.find(item => item?.id === id)) {
					setMessage('added!')

					return [...currItems, { ...product, quantity: 1 }]
				} else {
					const quantity = currItems?.find(item => item?.id === id).quantity
					console.log(productInventory > quantity, quantity, productInventory)
					const e = productInventory > quantity
					//if in cart, increase quantity
					if (e) {
						return currItems.map(item => {
							if (item?.id === id) {
								setMessage('added!')

								return { ...item, quantity: item.quantity + 1 }
							} else {
								setMessage('poop')

								return item
							}
						})
					} else {
						setMessage('maximum')
						return currItems
					}
				}
			})
		}
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
