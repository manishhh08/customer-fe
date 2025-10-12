import { toast } from "react-toastify";
import {
  deleteAccessToken,
  deleteRefreshToken,
  storeToken,
} from "../../utils/storageFunction";
import {
  createCustomer,
  fetchCustomerDetail,
  loginCustomer,
} from "./customerAPI";
import { setCustomer, setLoading } from "./customerSlice";

export const registerCustomerAction = (form) => async (dispatch) => {
  try {
    const data = await createCustomer(form);
    if (data.status === "success") {
      // dispatch(getAllUserAction());
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
    // retrieve customer detail
    if (data?.customer) {
      dispatch(setCustomer(data?.customer));
    }
  }
  return { status: data.status, message: data.message };
};

export const getCustomerDetail = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const data = await fetchCustomerDetail();

    if (data.status === "success") {
      dispatch(setCustomer(data.customer));
    } else {
      dispatch(setCustomer(null));
    }
  } catch (err) {
    console.error(err);
    dispatch(setCustomer(null));
  }
};

export const logoutAction = () => (dispatch) => {
  dispatch(setCustomer({}));
  deleteAccessToken();
  deleteRefreshToken();
};
