import { toast } from "react-toastify";
import { storeToken } from "../../utils/storageFunction";
import { createCustomer, loginCustomer } from "./customerAPI";

export const registerCustomerAction = (form) => async (dispatch) => {
  try {
    const data = await createCustomer(form);
    if (data.status === "success") {
      //dispatch(getAllUserAction());
      toast[data.status](data.message);
      return data;
    } else {
      toast[data.status](data.message || "Something went wrong");
    }
    return data;
  } catch (error) {
    toast[data.status](data?.message || "Something went wrong");
    return {
      status: "error",
      message: error?.message || "Something went wrong",
    };
  }
};

export const loginCustomerAction = (form) => async (dispatch) => {
  let data = await loginCustomer(form);

  // if success then
  if (data.status === "success") {
    // accessToken store
    storeToken(data.accessToken, "access");
    // refreshToken store
    storeToken(data.refreshToken, "refresh");
    // retrieve user detail
    // dispatch(getUserDetail());
  }
  return { status: data.status, message: data.message };
};
