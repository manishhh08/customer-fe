import { storeToken } from "../../utils/storageFunction";
import { loginCustomer } from "./customerAPI";

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
