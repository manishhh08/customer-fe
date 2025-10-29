import { toast } from "react-toastify";
import { createNewOrder } from "./orderAPI";

export const createNewOrderAction = async (orderObject) => {
  try {
    const data = await createNewOrder(orderObject);
    console.log(data);
    if (data.status === "success") {
      toast[data.status](data.message);
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
