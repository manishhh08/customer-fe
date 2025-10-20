import { apiProcessor } from "../../utils/axiosHelper";

const apiUrl = import.meta.env.VITE_APP_API_URL + "/api/v1";

//create new customer
export const createCustomer = async (obj) => {
  return apiProcessor({
    method: "POST",
    url: `${apiUrl}/auth/register`,
    data: obj,
  });
};

export const verifyEmailAPi = async (token, email) => {
  return apiProcessor({
    method: "POST",
    url: `${apiUrl}/auth/verify`,
    data: { token, email },
  });
};

// login customer
export const loginCustomer = async (obj) => {
  return apiProcessor({
    method: "POST",
    url: `${apiUrl}/auth/login`,
    data: obj,
  });
};

// refresh token
export const refreshTokenApi = () => {
  return apiProcessor({
    method: "get",
    url: `${apiUrl}/auth/refresh-token`,
    isPrivate: true,
    isRefresh: true,
  });
};

//get customer detail
export const fetchCustomerDetail = async () => {
  return apiProcessor({
    method: "get",
    url: `${apiUrl}/customer`,
    isPrivate: true,
  });
};

// update customer detail
export const updateCustomerDetail = async (obj) => {
  return apiProcessor({
    method: "PUT",
    url: `${apiUrl}/customer`,
    data: obj,
    isPrivate: true,
  });
};
