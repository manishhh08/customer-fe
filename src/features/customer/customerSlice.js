import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  customer: {},
};

const customerSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCustomer: (state, actions) => {
      state.user = actions.payload;
    },
  },
});

const { reducer, actions } = customerSlice;
export const { setCustomer } = actions;
export default reducer;
