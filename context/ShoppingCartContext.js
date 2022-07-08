import { createContext, useContext, useReducer, useState } from 'react'
import { formatCurrencyString } from 'use-shopping-cart'

export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({ children }) => {
	const [cart, setCart] = useState([])
	//begin writing functions

	//increaseQuantity
	const increaseQuantity = product => {
		const id = product.id
		console.log(id)
		setCart(currItems => {
			// console.log(currItems.find(item => item.id === id))

			// console.log(currItems, id)
			if (!currItems.find(item => item?.id === id)) {
				return [...currItems, { ...product, quantity: 1 }]
			} else {
				return currItems.map(item => {
					console.log(currItems, '+1?')

					if (item?.id === id) {
						console.log(item.id)
						return { ...item, quantity: item.quantity + 1 }
					} else {
						return item
					}
				})
			}
		})
	}
	//cartQuantity
	const cartQuantity = () => cart.reduce((quantity, item) => item?.quantity + quantity, 0)
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
		const a = cart.reduce((total, item) => total + item.default_price.unit_amount * item.quantity, 0)
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
			}}>
			{children}
		</ShoppingCartContext.Provider>
	)
}
export const useShoppingCart = () => {
	return useContext(ShoppingCartContext)
}