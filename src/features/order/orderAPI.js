import { apiProcessor } from "../../utils/axiosHelper";
const apiUrl = import.meta.env.VITE_APP_API_URL + "/api/v1";

export const createNewOrder = async (orderObject) => {
  return apiProcessor({
    method: "post",
    url: `${apiUrl}/orders`,
    data: orderObject,
    isPrivate: true,
  });
};

export const retrieveAllOrder = async (customerId) => {
  return apiProcessor({
    method: "get",
    url: `${apiUrl}/orders?id=${customerId}`,
    isPrivate: true,
  });
};
