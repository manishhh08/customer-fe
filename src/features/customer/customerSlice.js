import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  customer: null,
  loading: true,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomer: (state, actions) => {
      state.customer = actions.payload;
      state.loading = false;
    },
    logoutCustomer: (state) => {
      state.customer = null;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

const { reducer, actions } = customerSlice;
export const { setCustomer, logoutCustomer, setLoading } = actions;
export default reducer;
