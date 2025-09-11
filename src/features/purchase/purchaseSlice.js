import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  purchases: [],
};

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    setPurchases: (state, actions) => {
      state.purchases = actions.payload;
    },
  },
});
const { reducer, actions } = purchaseSlice;
export const { setPurchases } = actions;
export default reducer;
