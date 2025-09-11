import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, actions) => {
      state.products = actions.payload;
    },
  },
});
const { reducer, actions } = productSlice;
export const { setProducts } = actions;
export default reducer;
