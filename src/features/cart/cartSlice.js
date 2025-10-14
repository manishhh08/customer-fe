import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];

const initialState = {
  items: savedCart,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { id, change } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.quantity = Math.max(1, item.quantity + change);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
  },
});
const { reducer, actions } = cartSlice;

export const {
  setCartItems,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = actions;
export default reducer;
