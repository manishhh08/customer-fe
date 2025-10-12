import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../features/customer/customerSlice";
import reviewReducer from "../features/review/reviewSlice";
import purchaseReducer from "../features/purchase/purchaseSlice";
import productReducer from "../features/product/productSlice";
import cartReducer from "../features/cart/cartSlice";
export default configureStore({
  reducer: {
    customerStore: customerReducer,
    reviewStore: reviewReducer,
    purchaseStore: purchaseReducer,
    productStore: productReducer,
    cartStore: cartReducer,
  },
});
