import { createSlice } from "@reduxjs/toolkit";

const loadCartFromStorage = () => {
  try {
    const stored = localStorage.getItem("cartItems");
    if (!stored || stored === "undefined" || stored === "null") {
      return [];
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error("Error parsing cartItems from localStorage:", error);
    localStorage.removeItem("cartItems");
    return [];
  }
};

const initialState = {
  items: loadCartFromStorage(),
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
      const existingItem = state.items.find((i) => i._id === item._id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { id, change } = action.payload;
      const item = state.items.find((i) => i._id === id);
      if (item) {
        item.quantity = Math.max(1, item.quantity + change);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      console.log("clear cart fucntion triggered");
      state.items = [];
      localStorage.removeItem("cartItems");
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
