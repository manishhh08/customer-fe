import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  customer: null,
  loading: true,
  isLogginOut: false,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomer: (state, actions) => {
      state.customer = actions.payload;
      state.loading = false;
      state.isLogginOut = false;
    },
    logoutCustomer: (state) => {
      state.customer = null;
      state.loading = false;
      state.isLogginOut = true;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

const { reducer, actions } = customerSlice;
export const { setCustomer, logoutCustomer, setLoading } = actions;
export default reducer;
