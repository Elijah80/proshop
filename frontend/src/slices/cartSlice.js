import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cartItems: [] }

const addDecimals = num => (Math.round(num * 100) / 100).toFixed(2)

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const newItem = action.payload
			const itemExists = state.cartItems.find(item => item._id === newItem._id)
			if (itemExists) {
				state.cartItems = state.cartItems.map(item => (item._id === newItem._id ? newItem : item))
			} else {
				state.cartItems = [...state.cartItems, newItem]
			}

			// Calculate items price
			state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

			// Calculate shipping price (If order is over $100 the free shipping, else $10 shipping)
			state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)

			// Calculate tax price (15% tax)
			state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)))

			// Calculate total price
			state.totalPrice = (
				Number(state.itemsPrice) +
				Number(state.shippingPrice) +
				Number(state.taxPrice)
			).toFixed(2)

			localStorage.setItem('cart', JSON.stringify(state))
		},
	},
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer
