import {
  addCartItem,
  decreaseItemQuantity,
  increaseItemQuantity,
  removeCartItem,
} from "./cartSlice";

export const addToCartAction = (item) => (dispatch) => {
  dispatch(addCartItem(item));
};

export const removeFromCartAction = (item) => (dispatch) => {
  dispatch(removeCartItem(item));
};

export const increaseItemQuantityAction = (item) => (dispatch) => {
  dispatch(increaseItemQuantity(item));
};

export const decreaseItemQuantityAction = (item) => (dispatch) => {
  dispatch(decreaseItemQuantity(item));
};
