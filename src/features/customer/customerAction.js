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
  updateCustomerDetail,
  verifyEmailAPi,
} from "./customerAPI";
import { logoutCustomer, setCustomer, setLoading } from "./customerSlice";

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

export const verifyEmailAction = async (token, email) => {
  const result = await verifyEmailAPi(token, email);
  console.log(3223, result);
  return { status: result.status, message: result.message };
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

export const updateCustomerDetailAction = (form) => async (dispatch) => {
  try {
    const res = await updateCustomerDetail(form);
    if (res.status === "success") {
      toast.success(res.message || "Profile updated");
      // refresh store
      if (res.customer) dispatch(setCustomer(res.customer));
      else dispatch(fetchCustomerDetail());
    } else {
      toast.error(res.message || "Could not update profile");
    }
  } catch (e) {
    toast.error(e?.message || "Update failed");
  }
};

export const logoutAction = () => (dispatch) => {
  dispatch(logoutCustomer());
  deleteAccessToken();
  deleteRefreshToken();
};
