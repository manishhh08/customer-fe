import { toast } from "react-toastify";
import { createNewOrder } from "./purchaseAPI";

export const createNewOrderAction = (orderObject) => async (dispatch) => {
  try {
    const data = await createNewOrder(orderObject);
    if (data.status === "success") {
      toast[data.status](data.message);
      return data;
    }
  } catch (err) {
    toast[data.status](data?.message || "Something went wrong");
    console.log("Order creation error:", err.message, err.stack);
    return {
      status: "error",
      message: err?.message || "Something went wrong",
    };
  }
};
