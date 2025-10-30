import { toast } from "react-toastify";
import { createNewOrder } from "./orderAPI";

export const createNewOrderAction = (orderObject) => async () => {
  try {
    const data = await createNewOrder(orderObject);
    if (data.status === "success") {
      toast[data.status](data.message);
      return data;
    } else {
      toast[data.status](data.message);
      return data;
    }
  } catch (err) {
    return {
      status: "error",
      message: err?.message || "Something went wrong",
    };
  }
};
