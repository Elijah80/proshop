import { createSlice } from '@reduxjs/toolkit'
import { updateCart } from '../utils/cartUtils'

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cartItems: [] }


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

			return updateCart(state)
		},
		removeFromCart: (state, action) => {
			state.cartItems = state.cartItems.filter(item => item._id !== action.payload)

			return updateCart(state)
		}
	},
})

export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer
