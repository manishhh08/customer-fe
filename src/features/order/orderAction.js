import { toast } from "react-toastify";
import { createNewOrder } from "./orderAPI";

export const createNewOrderAction = (orderObject) => async (dispatch) => {
  try {
    const data = await createNewOrder(orderObject);
    if (data.status === "success") {
      toast[data.status](data.message);
      fetchFeaturedProductsAction();
      return data;
    }
  } catch (err) {
    console.log("Order creation error:", err.message, err.stack);
    return {
      status: "error",
      message: err?.message || "Something went wrong",
    };
  }
};
