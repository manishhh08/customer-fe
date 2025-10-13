import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

// --- Future API integration (optional)
// export const fetchCartItems = createAsyncThunk("cart/fetchCartItems", async () => {
//   const { data } = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/v1/cart`);
//   return data.items;
// });

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, change } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.quantity = Math.max(1, item.quantity + change);
      }
    },
    clearCart: (state) => {
      state.items = [];
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
