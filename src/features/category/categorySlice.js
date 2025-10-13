import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  subCategories: [],
  loading: true,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;

      state.loading = false;
      state.error = null;
    },
    setSubCategories: (state, action) => {
      state.subCategories = action.payload;
      state.loading = false;
      state.error = null;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

const { reducer, actions } = categorySlice;
export const { setCategories, setLoading, setSubCategories, setError } =
  actions;
export default reducer;
