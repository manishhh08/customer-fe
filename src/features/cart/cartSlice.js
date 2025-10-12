import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartItems: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const existingItem = state.cartItems.find(
        (i) => i.item._id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ item: action.payload, quantity: 1 });
      }

      state.total += action.payload.price;
    },
    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (i) => i.item._id !== action.payload.item._id
      );

      state.total =
        state.total - action.payload.quantity * action.payload.item.price;
    },
    increaseItemQuantity: (state, action) => {
      const existingItem = state.cartItems.find(
        (i) => i.item._id === action.payload.item._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        state.total += existingItem.item.price;
      }
    },
    decreaseItemQuantity: (state, action) => {
      const existingItem = state.cartItems.find(
        (i) => i.item._id === action.payload.item._id
      );

      if (existingItem) {
        existingItem.quantity -= 1;
        state.total -= existingItem.item.price;
      }
    },
  },
});

const { reducer, actions } = cartSlice;
export const {
  addCartItem,
  removeCartItem,
  increaseItemQuantity,
  decreaseItemQuantity,
} = actions;
export default reducer;
