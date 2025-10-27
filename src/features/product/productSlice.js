import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  topRatedProducts: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, actions) => {
      state.products = actions.payload;
    },
    setTopRatedProducts: (state, action) => {
      state.topRatedProducts = action.payload;
    },
  },
});
const { reducer, actions } = productSlice;
export const { setProducts, setTopRatedProducts } = actions;
export default reducer;
