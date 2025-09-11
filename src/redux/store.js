import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import reviewReducer from "../features/review/reviewSlice";
import purchaseReducer from "../features/purchase/purchaseSlice";
import productReducer from "../features/product/productSlice";
export default configureStore({
  reducer: {
    userStore: userReducer,
    reviewStore: reviewReducer,
    purchaseStore: purchaseReducer,
    productStore: productReducer,
  },
});
